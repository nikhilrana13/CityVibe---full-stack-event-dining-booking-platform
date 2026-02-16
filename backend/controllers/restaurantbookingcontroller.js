const generateSlots = require("../helpers/generateSlots.js");
const Restaurantbooking = require("../models/bookings/restaurantbookingmodel.js");
const Restaurant = require("../models/restaurantmodel.js");
const Ticket = require("../models/ticketmodel.js");
const User = require("../models/usermodel.js");
const Response = require("../utils/responsehandler.js")


// get available slots
/**
 * @route   GET /api/restaurant/slots
 * @desc    Generates and returns available lunch and dinner time slots 
 *          for a specific restaurant on a selected date.
 * 
 * @query   restaurantId (required) - Restaurant ID
 * @query   date (required) - Booking date (YYYY-MM-DD)
 * 
 * @logic
 * - Fetch restaurant timing configuration (lunchStart, lunchEnd, dinnerStart, dinnerEnd, slotInterval)
 * - Generate time slots dynamically using helper (generateSlots)
 * - Prevent past time slots for current date
 * - Returns separate lunchSlots and dinnerSlots arrays
 * 
 * @access  Public
 */
const GetAvailableSlots = async (req, res) => {
  try {
    const { restaurantId, date } = req.query;
    if (!restaurantId || !date) {
      return Response(res, 400, "RestaurantId and date are required");
    }
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return Response(res, 404, "Restaurant not found");
    }
    const lunchSlots = generateSlots(
      restaurant.lunchStart,
      restaurant.lunchEnd,
      restaurant.slotInterval,
    );

    const dinnerSlots = generateSlots(
      restaurant.dinnerStart,
      restaurant.dinnerEnd,
      restaurant.slotInterval,
    );
    // Create date range for proper matching
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);
    // get existing bookings
    const bookings = await Restaurantbooking.find({
      restaurant: restaurantId,
      bookingDate: { $gte: selectedDate, $lte: endOfDay },
      bookingStatus: "confirmed",
    });
    const bookedSlots = bookings.map((b) => b.timeSlot);
    const filterSlots = (slots) =>
      slots.filter((slot) => !bookedSlots.includes(slot));
    const availableLunchSlots = filterSlots(lunchSlots);
    const availableDinnerSlots = filterSlots(dinnerSlots);

    return Response(res, 200, "Slots fetched successfully", {
      lunchSlots: availableLunchSlots,
      dinnerSlots: availableDinnerSlots,
    });
  } catch (error) {
    console.log("failed to fetch slots", error);
    return Response(res, 500, "Internal server error");
  }
};
// user restaurant booking
/**
 * @route   POST /api/restaurant/create-booking
 * @desc    Creates a restaurant reservation booking for a user.
 * 
 * @body    restaurantId (required) - Restaurant ID
 * @body    bookingdate (required) - Booking date (YYYY-MM-DD)
 * @body    timeSlot (required) - Selected time slot (HH:mm)
 * @body    numberofguests (required) - Guests count (max 10)
 * @body    reservationType (required) - "free" | "paid"
 * @body    specialrequests (optional) - Additional user notes
 * 
 * @logic
 * - Validates required fields
 * - Prevents past date & past time booking
 * - Validates selected timeSlot against restaurant generated slots
 * - Prevents duplicate booking for same user + date + slot
 * - Creates booking with default status "confirmed"
 * 
 * @access  Private (Authenticated User)
 */
const CreateRestaurantBooking = async (req, res) => {
  try {
    const userId = req.user;
    let {
      bookingdate,
      restaurantId,
      timeSlot,
      numberofguests,
      specialrequests,
      reservationType,
    } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return Response(
        res,
        404,
        "user not found or you are not authorized to book ",
      );
    }
    //required fields validation
    const allowedFields = [
      "restaurantId",
      "bookingdate",
      "timeSlot",
      "numberofguests",
      "reservationType",
    ];
    for (let field of allowedFields) {
      if (!req.body[field]) {
        return Response(res, 400, `${field} is Required`);
      }
    }
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return Response(res, 404, "Restaurant not found");
    }
    // prevent past booking
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(bookingdate) < today) {
      return Response(res, 400, "Cannot book past date");
    }
    numberofguests = Number(numberofguests);
    // max reservation per person
    if (numberofguests <= 0 || numberofguests > 10) {
      return Response(res, 400, "Guests limit exceeded");
    }
    // cannot book past time slot
    const now = new Date();
    const selectedDate = new Date(bookingdate);
    selectedDate.setHours(0,0,0,0);
    if (selectedDate.toDateString() === now.toDateString()) {
      const [hours, minutes] = timeSlot.split(":");
      const slotDateTime = new Date(selectedDate);
      slotDateTime.setHours(hours, minutes, 0, 0);

      if (slotDateTime < now) {
        return Response(res, 400, "Cannot book past time slot");
      }
    }
    // check slot is valid
    const validSlots = [
      ...generateSlots(
        restaurant.lunchStart,
        restaurant.lunchEnd,
        restaurant.slotInterval,
      ),
      ...generateSlots(
        restaurant.dinnerStart,
        restaurant.dinnerEnd,
        restaurant.slotInterval,
      ),
    ];
    if (!validSlots.includes(timeSlot)) {
      return Response(res, 400, "Invalid time slot selected");
    }
    // check booking already exists in same slot
    const existingBooking = await Restaurantbooking.findOne({
      user: userId,
      restaurant: restaurant._id,
      bookingdate: selectedDate,
      timeSlot,
      bookingStatus: "confirmed",
    });
    if (existingBooking) {
      return Response(res, 400, "You already have a booking for this slot");
    }
    // create booking
    const booking = await Restaurantbooking.create({
      restaurant: restaurant._id,
      user: userId,
      bookingdate: selectedDate,
      timeSlot,
      numberofguests,
      reservationType,
      specialrequests: specialrequests || "",
      bookingStatus: "confirmed",
    });
    return Response(res, 200, "Booking confirmed", booking);
  } catch (error) {
    console.log("failed to book restaurant", error);
    return Response(res, 500, "Internal server error");
  }
};
// user Cancel booking 
const CancelBooking = async(req,res)=>{
   try {
        const userId = req.user 
        const bookingId = req.params.id 
        
        const user = await User.findById(userId)
        if(!user){
          return Response(res,404,"User not found")
        }
        const booking = await Restaurantbooking.findById(bookingId)
        if(!booking){
          return Response(res,400,"Booking not found")
        }
        if(booking.paymentStatus === "cancelled"){
          return Response(res,200,"Booking already cancelled")
        }
        booking.bookingStatus = "cancelled",
        await booking.save()
        return Response(res,200,"Booking cancelled successfully")
   } catch (error) {
     console.error("Failed to cancel booking",error)
     return Response(res,500,"Internal server error")
   }
}
// user bookings
const UserallDiningbookings = async(req,res)=>{
   try {
       const userId = req.user
       let {page=1} = req.query 
       const limit = 5 
       page = parseInt(page)
       const skip = (page - 1) * limit

       const user = await User.findById(userId)
       if(!user){
        return Response(res,404,"User not found")
       }
       const bookings = await Restaurantbooking.find({user:userId}).populate("user","name phonenumber email").sort({createdAt:1}).skip(skip).limit(limit)
       const totalbookings = await Restaurantbooking.countDocuments({user:userId})
       const totalPages = Math.ceil(totalbookings / limit)
       if(bookings.length === 0){
        return  Response(res,200,"No Bookings found",[])
       }
       return Response(res,200,"bookings found",{bookings,pagination:{
        totalbookings,totalPages,currentpage:page,limit
       }})
   } catch (error) {
    console.log("failed to get bookings",error)
    return Response(res,500,"Internal server error")
   }
}
// each booking detail
const GetDiningBookingDetail = async(req,res)=>{
   try {
      const userId = req.user 
      const bookingId = req.params.id;

      const user = await User.findById(userId)
      if(!user){
        return Response(res,404,"User not found")
      }
      const booking = await Restaurantbooking.findById(bookingId).populate("user","name email phonenumber")
      if (!booking) {
        return Response(res, 404, "booking not found");
      }
      return Response(res, 200, "booking details found", {booking });
    } catch (error) {
      console.log("failed to get booking details", error);
      return Response(res, 500, "Internal server error");
    }
}


module.exports = {CreateRestaurantBooking,GetAvailableSlots,CancelBooking,UserallDiningbookings,GetDiningBookingDetail}

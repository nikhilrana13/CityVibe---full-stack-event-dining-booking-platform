const Eventbooking = require("../models/bookings/eventbookingmodel.js");
const Restaurantbooking = require("../models/bookings/restaurantbookingmodel.js");




const GetUserEventBookingsForAgent = async (userId) => {
  const bookings = await Eventbooking.find({ user:userId }).sort({ createdAt: -1 }).populate("event","startDate starttime title location").populate("tickets.ticket","name price paxCount",).lean();
 const aiBookingData = bookings.map((booking) => ({
  bookingId: booking?._id,
  event: {
    title: booking?.event?.title,
    date: booking?.event?.startDate,
    time: booking?.event?.starttime,
    location: booking?.event?.location,
  },
  tickets: booking?.tickets?.map((item) => ({
    type: item?.ticket?.name,
    quantity: item?.quantity,
    pricePerTicket: item?.ticket?.price,
  })),
  totalTickets: booking?.totalSeats,
  totalAmount: booking?.totalAmount,
  paymentStatus: booking?.paymentStatus,
  bookingStatus: booking?.bookingStatus,
  bookedAt: booking?.createdAt,
}));
// console.log("bookingdata",aiBookingData)
  return aiBookingData
};

 const GetUserDiningBookingsForAgent = async (userId) => {
 const bookings = await Restaurantbooking.find({ user:userId }).sort({ createdAt: -1 }).populate("user","name email").populate("restaurant","name location")
 const aiDiningBookingData = bookings.map((booking) => ({
  bookingId: booking._id,
  restaurant: {
    name: booking.restaurant?.name,
    location: booking.restaurant?.location,
  },
  bookingDate: booking.bookingdate,
  time: booking.timeSlot,
  guests: booking.numberofguests,
  reservationType: booking.reservationType,
  bookingStatus: booking.bookingStatus,
  specialRequests: booking.specialrequests || null,
  bookedAt: booking.createdAt,
}));

  return aiDiningBookingData
};

module.exports = {GetUserEventBookingsForAgent,GetUserDiningBookingsForAgent}
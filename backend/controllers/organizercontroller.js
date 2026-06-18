const Organizer = require("../models/organizermodel.js");
const User = require("../models/usermodel.js");
const Response = require("../utils/responsehandler.js");
const sharp = require("sharp");
const cloudinary = require("../config/cloudinary.js");
const Event = require("../models/eventmodel.js");
const Eventbooking = require("../models/bookings/eventbookingmodel.js");
const Restaurantbooking = require("../models/bookings/restaurantbookingmodel.js");
const Restaurant = require("../models/restaurantmodel.js");

// onboarding organizer
const OnBoardingOrganizer = async (req, res) => {
  try {
    const userId = req.user;
    const {
      businessName,
      businessEmail,
      businessPhone,
      panNumber,
      bankAccountNumber,
      ifscCode,
    } = req.body;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // pan card front and back images
    const file = req.file;
    //validation
    if (
      !businessName ||
      !businessEmail ||
      !businessPhone ||
      !panNumber ||
      !bankAccountNumber ||
      !ifscCode
    ) {
      return Response(res, 400, "All fields is required");
    }
    if (!panRegex.test(panNumber)) {
      return Response(res, 400, "Invalid Pan Number");
    }
    if (!ifscRegex.test(ifscCode)) {
      return Response(res, 400, "Invalid ifsc Code");
    }
    if (!emailRegex.test(businessEmail)) {
      return Response(res, 400, "Invalid Business email");
    }
    if (businessPhone.length < 10) {
      return Response(res, 400, "Invalid business phone");
    }

    if (!file) {
      return Response(res, 400, "Please Upload pan card image");
    }
    // check user exists or not
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 404, "User not found");
    }
    // check organizer already exists
    const organizerexists = await Organizer.findOne({ user: user?._id });
    if (organizerexists) {
      return Response(res, 400, "Organizer request already submitted");
    }
    //optimized pan card image using sharp
    const optimizedImage = await sharp(file.buffer)
      .resize({ width: 500 })
      .webp({ quality: 80 })
      .toBuffer();
    const imageBase64 = `data:image/webp;base64,${optimizedImage.toString("base64")}`;
    const cloudResponse = await cloudinary.uploader.upload(imageBase64, {
      folder: "city-vibe-organizer-documents",
      resource_type: "image",
    });
    //Create organizer model
    const organizer = await Organizer.create({
      user: user._id,
      businessEmail,
      businessName,
      businessPhone,
      panNumber,
      bankAccountNumber,
      ifscCode,
      pancardimage: cloudResponse.secure_url,
      verificationStatus: "pending",
    });
    user.hasOrganizerAccount = true;
    await user.save();
    return Response(res, 200, "OnBoarding successful", { organizer });
  } catch (error) {
    console.log("failed to create organizer", error);
    return Response(res, 500, "Internal server error");
  }
};
// get organizer profile
const OrganizerProfile = async (req, res) => {
  try {
    const userId = req.user;
    const organizer = await Organizer.findOne({ user: userId });
    if (!organizer) {
      return Response(res, 404, "Organizer not found");
    }
    return Response(res, 200, "Organizer found", { organizer });
  } catch (error) {
    console.log("failed to fetch organizer", error);
    return Response(res, 500, "Internal server error");
  }
};
// update Organizer business profile
const UpdateBusinessProfile = async (req, res) => {
  try {
    const userId = req.user;
    const { businessName, businessEmail, businessPhone } = req.body;
    // check organiser is approved or exists
    const organizer = await Organizer.findOne({
      user: userId,
      isApproved: true,
    }).populate("user", "name email");
    if (!organizer) {
      return Response(res, 403, "Only approved organizers can access");
    }
    let updateData = {};
    if (businessEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(businessEmail)) {
        return Response(res, 400, "Invalid Business email");
      }
      // Check duplicate email
      const existingEmail = await Organizer.findOne({
        businessEmail,
        _id: { $ne: organizer._id },
      });
      if (existingEmail) {
        return Response(res, 400, "Business email already in use");
      }
      updateData.businessEmail = businessEmail;
    }
    if (businessPhone) {
      if (businessPhone.length < 10) {
        return Response(res, 400, "Invalid business phone");
      }
      updateData.businessPhone = businessPhone;
    }
    if (businessName) {
      updateData.businessName = businessName.trim();
    }
    if (Object.keys(updateData).length === 0) {
      return Response(res, 200, "No fields provided to update");
    }
    const updatedOrganizer = await Organizer.findByIdAndUpdate(
      organizer._id,
      { $set: updateData },
      { new: true },
    );
    return Response(res, 200, "profile updated successsfully", {
      updatedOrganizer,
    });
  } catch (error) {
    console.log("failed to update organizer profile", error);
    return Response(res, 500, "Internal server error");
  }
};
// organizer dashboard stats
const OrganizerDashboardStats = async (req, res) => {
  try {
    const userId = req.user;
    // check organiser is approved or exists
    const organizer = await Organizer.findOne({
      user: userId,
      isApproved: true,
    }).populate("user", "name email");
    if (!organizer) {
      return Response(res, 403, "Only approved organizers can access");
    }
    // get organizer all events
    const events = await Event.find({ organizer: organizer._id});
    //find events id
    const eventIds = events.map((e) => e._id);
    // find payment status paid or booking status confirmed event bookings
    const eventbookings = await Eventbooking.find({
      event: { $in: eventIds },
      paymentStatus: "paid",
      bookingStatus: "confirmed",
    }).select("totalAmount totalSeats");
    // total revenue
    const totalRevenue =
      eventbookings.reduce((sum, booking) => sum + booking.totalAmount, 0) || 0;
    // total tickets sold
    const totalTicketsolds =
      eventbookings.reduce((sum, booking) => sum + booking.totalSeats, 0) || 0;
    const totalEvents = events.length || 0;
    const totaleventbookings = eventbookings.length || 0;
    // find dining bookings
    const restaurant = await Restaurant.findOne({ organizer: organizer._id });
    let totaldiningbookings = 0;
    if (restaurant) {
      const diningbookings = await Restaurantbooking.find({
        restaurant: restaurant._id,
        bookingStatus: "confirmed",
      });
      totaldiningbookings = diningbookings?.length || 0;
    }
    return Response(res, 200, "dashboard stats fetched successfully", {
      stats: {
        totalRevenue,
        totalTicketsolds,
        totaleventbookings,
        totalEvents,
        totaldiningbookings,
      },
    });
  } catch (error) {
    console.log("Failed to get dashboard stats", error);
    return Response(res, 500, "Internal server error");
  }
};
// revenue analytics
const OrganizerRevenueAnalytics = async (req, res) => {
  try {
    const userId = req.user;
    const organizer = await Organizer.findOne({
      user: userId,
      isApproved: true,
    });
    if (!organizer) {
      return Response(res, 403, "Only approved organizers can access");
    }
    const events = await Event.find({ organizer: organizer._id }).select("_id");
    const eventIds = events.map((e) => e._id);
    if (!eventIds.length) {
      return Response(res, 200, "No events found", {
        monthlyRevenue: [],
        growth: 0,
      });
    }
    // last 12 months by default
    const range = parseInt(req.query.range) || 12;
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - range);

    const monthlyRevenue = await Eventbooking.aggregate([
      {
        $match: {
          event: { $in: eventIds },
          paymentStatus: "paid",
          bookingStatus: "confirmed",
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);
    const monthNames = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedRevenue = monthlyRevenue.map((item) => ({
      month: monthNames[item._id.month],
      revenue: item.revenue,
    }));
    // calculate growth %
    const currentMonth = formattedRevenue.at(-1)?.revenue || 0;
    const lastMonth = formattedRevenue.at(-2)?.revenue || 0;
    const growth =
      lastMonth === 0
        ? 0
        : (((currentMonth - lastMonth) / lastMonth) * 100).toFixed(1);
    return Response(res, 200, "Revenue analytics fetched", {
      monthlyRevenue: formattedRevenue,
      growth: Number(growth),
    });
  } catch (error) {
    console.error("Revenue analytics error", error);
    return Response(res, 500, "Internal server error");
  }
};
// organizer event management stats
const EventManagementStats = async (req, res) => {
  try {
    const userId = req.user;
    // check organiser is approved or exists
    const organizer = await Organizer.findOne({
      user: userId,
      isApproved: true,
    }).populate("user", "name email");
    if (!organizer) {
      return Response(res, 403, "Only approved organizers can access");
    }
    // get organizer all events
    const events = await Event.find({
      organizer: organizer._id,
    });
    //find events id
    const eventIds = events.map((e) => e._id);
    // find payment status paid or booking status confirmed event bookings
    const eventbookings = await Eventbooking.find({
      event: { $in: eventIds },
      paymentStatus: "paid",
      bookingStatus: "confirmed",
    }).select("totalAmount totalSeats");
    // total revenue
    const totalRevenue =
      eventbookings.reduce((sum, booking) => sum + booking.totalAmount, 0) || 0;
    // total tickets sold
    const totalTicketsolds =
      eventbookings.reduce((sum, booking) => sum + booking.totalSeats, 0) || 0;
    // current month revenue
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const monthRevenueBookings = await Eventbooking.find({
      event: { $in: eventIds },
      paymentStatus: "paid",
      bookingStatus: "confirmed",
      createdAt: { $gte: startOfMonth },
    }).select("totalAmount");

    const currentMonthRevenue = monthRevenueBookings.reduce(
      (sum, b) => sum + b.totalAmount,
      0,
    );
    const totalEvents = events.length || 0;
    return Response(res, 200, "event mangement stats fetched successfully", {
      stats:{
      totalRevenue,
      totalTicketsolds,
      currentMonthRevenue,
      totalEvents,
      }
    });
  } catch (error) {
    console.log("Failed to event management stats", error);
    return Response(res, 500, "Internal server error");
  }
};
// organizer dining management stats
const ManageDiningStats = async (req, res) => {
  try {
    const userId = req.user;
    // Check organizer
    const organizer = await Organizer.findOne({
      user: userId,
      isApproved: true,
    });
    if (!organizer) {
      return Response(res, 403, "Only approved organizers can access");
    }
    // Get organizer restaurant
    const restaurant = await Restaurant.findOne({
      organizer: organizer._id,
    });

    if (!restaurant) {
      return Response(res, 404, "Restaurant not found");
    }

    // Date ranges
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    // Queries
    const [
      totalbookings,
      confirmedbookings,
      cancelledbookings,
      todaysbookings,
      thisMonthbookings,
    ] = await Promise.all([
      // Total
      Restaurantbooking.countDocuments({
        restaurant: restaurant._id,
      }),
      // Confirmed
      Restaurantbooking.countDocuments({
        restaurant: restaurant._id,
        bookingStatus: "confirmed",
      }),
      // Cancelled
      Restaurantbooking.countDocuments({
        restaurant: restaurant._id,
        bookingStatus: "cancelled",
      }),
      // Today
      Restaurantbooking.countDocuments({
        restaurant: restaurant._id,
        bookingdate: { $gte: todayStart, $lte: todayEnd },
      }),
      // This Month
      Restaurantbooking.countDocuments({
        restaurant: restaurant._id,
        createdAt: { $gte: monthStart },
      }),
    ]);
    // console.log("stats",totalbookings,confirmedbookings,cancelledbookings,todaysbookings,thisMonthbookings)
    return Response(res, 200, "Dining dashboard stats fetched", {
      stats:{
      totalbookings,
      confirmedbookings,
      cancelledbookings,
      todaysbookings,
      thisMonthbookings,
    }
     
    });
  } catch (error) {
    console.log("Failed to fetch dining stats", error);
    return Response(res, 500, "Internal server error");
  }
};
// organizer event booking stats (manage event bookings page)
const EventBookingPageStats = async (req, res) => {
  try {
    const userId = req.user;
    // Check approved organizer
    const organizer = await Organizer.findOne({
      user: userId,
      isApproved: true,
    });
    if (!organizer) {
      return Response(res, 403, "Only approved organizers can access");
    }
    // Get organizer events
    const events = await Event.find({ organizer: organizer._id }).select("_id");
    if (!events.length) {
      return Response(res, 200, "No events found", {
        totalBookings: 0,
        confirmedBookings: 0,
        cancelledBookings: 0,
        pendingBookings: 0,
      });
    }
    const eventIds = events.map((e) => e._id);
    // Aggregate booking stats
    const bookingStats = await Eventbooking.aggregate([
      {
        $match: {
          event: { $in: eventIds },
        },
      },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          confirmedBookings: {
            $sum: {
              $cond: [{ $eq: ["$bookingStatus", "confirmed"] }, 1, 0],
            },
          },
          cancelledBookings: {
            $sum: {
              $cond: [{ $eq: ["$bookingStatus", "cancelled"] }, 1, 0],
            },
          },
          pendingBookings: {
            $sum: {
              $cond: [{ $eq: ["$bookingStatus", "pending"] }, 1, 0],
            },
          },
        },
      },
    ]);

    const stats = bookingStats[0] || {
      totalBookings: 0,
      confirmedBookings: 0,
      cancelledBookings: 0,
      pendingBookings: 0,
    };

    return Response(res, 200, "Booking stats fetched",{
      stats
    });
  } catch (error) {
    console.log("Failed to fetch booking stats", error);
    return Response(res, 500, "Internal server error");
  }
};
// organizer dining booking page stats (manage dining bookings page)
const DiningBookingPageStats = async (req, res) => {
  try {
    const userId = req.user;
    // Check approved organizer
    const organizer = await Organizer.findOne({
      user: userId,
      isApproved: true,
    });

    if (!organizer) {
      return Response(res, 403, "Only approved organizers can access");
    }

    // Find Organizer restaurant
    const restaurant = await Restaurant.findOne({
      organizer: organizer._id,
    }).select("_id");

    if (!restaurant) {
      return Response(res, 200, "No restaurant found", {
        stats:{
        totalBookings: 0,
        confirmedBookings: 0,
        cancelledBookings: 0,
        pendingBookings: 0,
        }
    
      });
    }
    // Aggregate booking stats
    const bookingStats = await Restaurantbooking.aggregate([
      {
        $match: {
          restaurant: restaurant._id,
        },
      },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          confirmedBookings: {
            $sum: {
              $cond: [{ $eq: ["$bookingStatus", "confirmed"] }, 1, 0],
            },
          },
          cancelledBookings: {
            $sum: {
              $cond: [{ $eq: ["$bookingStatus", "cancelled"] }, 1, 0],
            },
          },
          pendingBookings: {
            $sum: {
              $cond: [{ $eq: ["$bookingStatus", "pending"] }, 1, 0],
            },
          },
        },
      },
    ]);

    const stats = bookingStats[0] || {
      totalBookings: 0,
      confirmedBookings: 0,
      cancelledBookings: 0,
      pendingBookings: 0,
    };

    return Response(res, 200, "Dining booking stats fetched",{stats});
  } catch (error) {
    console.log("Failed to fetch dining booking stats", error);
    return Response(res, 500, "Internal server error");
  }
};

module.exports = {
  OnBoardingOrganizer,
  UpdateBusinessProfile,
  OrganizerDashboardStats,
  EventManagementStats,
  ManageDiningStats,
  EventBookingPageStats,
  DiningBookingPageStats,
  OrganizerProfile,
  OrganizerRevenueAnalytics,
};

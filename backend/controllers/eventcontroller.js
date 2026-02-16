const sharp = require("sharp");
const Organizer = require("../models/organizermodel.js");
const cloudinary = require("../config/cloudinary.js");
const Event = require("../models/eventmodel.js");
const Ticket = require("../models/ticketmodel.js");
const Response = require("../utils/responsehandler.js");
const Eventbooking = require("../models/bookings/eventbookingmodel.js");

// create event
const CreateEvent = async (req, res) => {
  try {
    const userId = req.user;
    let { tickets, ...eventdata } = req.body;
    const categoriesWithArtists = ["music", "comedy", "performances"];
    const coverFile = req.files?.coverimage?.[0];
    const artistfiles = req.files?.artistimage || [];
    //required fields validation
    const allowedFields = [
      "title",
      "description",
      "category",
      "startDate",
      "starttime",
      "city",
      "location",
      "venue",
      "totalSeats",
    ];
    for (let field of allowedFields) {
      if (!req.body[field]) {
        return Response(res, 400, `${field} is Required`);
      }
    }
    // parse artist if come as string
    if (typeof eventdata.artists === "string") {
      try {
        eventdata.artists = JSON.parse(eventdata.artists);
      } catch (err) {
        return Response(res, 400, "Invalid artists format");
      }
    }
    // required artist validation for selected categories
    if (categoriesWithArtists.includes(eventdata.category)) {
      if (!eventdata.artists || eventdata.artists.length === 0) {
        return Response(
          res,
          400,
          "At least one artist is required for this category",
        );
      }

      if (artistfiles.length !== eventdata.artists.length) {
        return Response(res, 400, "Each artist must have one image");
      }
      for (let i = 0; i < eventdata.artists.length; i++) {
        const optimizedArtistImage = await sharp(artistfiles[i].buffer)
          .resize({ width: 400 })
          .webp({ quality: 80 })
          .toBuffer();
        const base64 = `data:image/webp;base64,${optimizedArtistImage.toString("base64")}`;
        const uploadRes = await cloudinary.uploader.upload(base64, {
          folder: "city-vibe-artist-images",
          resource_type: "image",
        });
        eventdata.artists[i].artistimage = uploadRes.secure_url;
      }
    }
    if (!coverFile) {
      return Response(res, 400, "Event Cover Image is Required");
    }
    // parse tickets if come as string
    if (typeof tickets === "string") {
      try {
        tickets = JSON.parse(tickets);
      } catch (err) {
        return Response(res, 400, "Invalid tickets format");
      }
    }
    if (!Array.isArray(tickets) || tickets.length === 0) {
      return Response(res, 400, "At least one ticket type is required");
    }
    // ticket validation
    for (let ticket of tickets) {
      if (!ticket.name || !ticket.price || !ticket.totalQuantity) {
        return Response(
          res,
          400,
          "Each ticket must have name, price and totalQuantity",
        );
      }

      if (Number(ticket.price) <= 0 || Number(ticket.totalQuantity) <= 0) {
        return Response(
          res,
          400,
          "Ticket price and quantity must be greater than 0",
        );
      }
    }
    // check organiser is approved or exists
    const organizer = await Organizer.findOne({
      user: userId,
      isApproved: true,
    });
    if (!organizer) {
      return Response(res, 403, "Only approved organizers can create events");
    }
    // optimized image
    const optimizeimage = await sharp(coverFile.buffer)
      .resize({ width: 800 })
      .webp({ quality: 80 })
      .toBuffer();
    const imageBase64 = `data:image/webp;base64,${optimizeimage.toString("base64")}`;
    const cloudResponse = await cloudinary.uploader.upload(imageBase64, {
      folder: "city-vibe-organizer-events-images",
      resource_type: "image",
    });
    eventdata.coverimage = cloudResponse.secure_url;
    // seat validation
    const totalTicketQuantity = tickets.reduce(
      (sum, ticket) => sum + Number(ticket.totalQuantity),
      0,
    );
    eventdata.totalSeats = Number(eventdata.totalSeats);
    if (totalTicketQuantity !== Number(eventdata.totalSeats)) {
      return Response(res, 400, "Total ticket quantity must equal total seats");
    }

    // create event
    const event = await Event.create({
      ...eventdata,
      organizer: organizer._id,
      availableSeats: eventdata.totalSeats,
    });
    // create tickets
    const ticketDocs = tickets.map((ticket) => ({
      event: event._id,
      name: ticket.name,
      price: ticket.price,
      totalQuantity: ticket.totalQuantity,
      availableQuantity: ticket.totalQuantity,
      paxCount: ticket.paxCount || 1,
      perPerson: ticket.perPerson ?? true,
      description: ticket.description || "",
    }));
    await Ticket.insertMany(ticketDocs);
    return Response(res, 200, "Event created successfully", { event });
  } catch (error) {
    console.error("failed to create event", error);
    return Response(res, 500, "Internal server error");
  }
};
// each event detail page
const EachEventDetails = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return Response(res, 404, "Event not found");
    }
    return Response(res, 200, "Event details found", { event });
  } catch (error) {
    console.log("failed to get event details", error);
    return Response(res, 500, "Internal server error");
  }
};
// get organizer all events
const getOrganizerAllevents = async (req, res) => {
  try {
    const userId = req.user;
    let { page = 1, limit = 6 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    // check organiser is approved or exists
    const organizer = await Organizer.findOne({
      user: userId,
      isApproved: true,
    }).populate("user", "name email");
    if (!organizer) {
      return Response(res, 403, "Only approved organizers can access");
    }
    const events = await Event.find({ organizer: organizer._id })
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit);
    const totalevents = await Event.countDocuments({
      organizer: organizer._id,
    });
    const totalPages = Math.ceil(totalevents / limit);
    if (events.length === 0) {
      return Response(res, 200, "No Events found", []);
    }
    return Response(res, 200, "Events found", {
      events,
      pagination: {
        totalPages,
        totalevents,
        currentPage: page,
        limit: limit,
      },
    });
  } catch (error) {
    console.error("Failed to get organizer events", error);
    return Response(res, 500, "Internal server error");
  }
};
//Delete Event
const DeleteEvent = async (req, res) => {
  try {
    const userId = req.user;
    const eventId = req.params.id;
    // check organiser is approved or exists
    const organizer = await Organizer.findOne({
      user: userId,
      isApproved: true,
    }).populate("user", "name email");
    if (!organizer) {
      return Response(res, 403, "Only approved organizers can access");
    }
    // find event
    const event = await Event.findById(eventId);
    if (!event) {
      return Response(res, 404, "Event not found");
    }
    // check event belongs to this organizer
    if (event.organizer.toString() !== organizer._id.toString()) {
      return Response(res, 403, "You are not authorized to delete this event");
    }
    await Event.findByIdAndDelete(eventId);
    return Response(res, 200, "Event Deleted Successfully");
  } catch (error) {
    console.error("Failed to delete event", error);
    return Response(res, 500, "Internal server error");
  }
};
// Cancel Event
const CancelEvent = async (req, res) => {
  try {
    const userId = req.user;
    const eventId = req.params.id;
    // check organiser is approved or exists
    const organizer = await Organizer.findOne({
      user: userId,
      isApproved: true,
    }).populate("user", "name email");
    if (!organizer) {
      return Response(res, 403, "Only approved organizers can access");
    }
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: eventId, organizer: organizer._id },
      { eventIsActive: false },
      { new: true },
    );
    if (!updatedEvent) {
      return Response(res, 403, "Event not found or not authorized");
    }
    return Response(res, 200, "Event Cancelled successfully");
  } catch (error) {
    console.log("failed to cancel event", error);
    return Response(res, 500, "Internal server error");
  }
};
// get all events with filters
const GetAllEvents = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 6,
      city,
      category,
      startDate,
      sortby,
      title,
    } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    let filter = { eventIsActive: true };
    // category filter for multiple categories
    if (category) {
      const categories = category.split(",").map((c) => c.trim());
      filter.$or = categories.map((c) => ({
        category: { $regex: new RegExp(c, "i") },
      }));
    }
    // city filter
    if (city) {
      filter.city = { $regex: new RegExp(city, "i") };
    }
    // date filter
    if (startDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // midnight reset
      let start, end;
      if (startDate === "Today") {
        start = today;
        end = new Date(today);
        end.setHours(23, 59, 59, 999);
      } else if (startDate === "Tomorrow") {
        start = new Date(today);
        start.setDate(start.getDate() + 1);
        start.setHours(0, 0, 0, 0);
        end = new Date(start);
        end.setHours(23, 59, 59, 999);
      } else if (startDate === "ThisWeek") {
        const dayOfWeek = today.getDay(); // Sunday = 0
        start = new Date(today);
        start.setDate(today.getDate() - dayOfWeek); // week start
        start.setHours(0, 0, 0, 0);
        end = new Date(start);
        end.setDate(start.getDate() + 6); // week end
        end.setHours(23, 59, 59, 999);
      } else if (startDate === "ThisMonth") {
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);
      }
      if (start && end) {
        filter.startDate = { $gte: start, $lte: end };
      }
    }
    // title filter
    if (title) {
      filter.title = { $regex: new RegExp(title, "i") };
    }
    // sorting
    let sortStage = { createdAt: -1 }; // default
    if (sortby === "lowtohigh") {
      sortStage = { minPrice: 1 };
    } else if (sortby === "hightolow") {
      sortStage = { minPrice: -1 };
    } else if (sortby === "relevant") {
      sortStage = { startDate: 1 };
    }

    const events = await Event.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "tickets",
          localField: "_id",
          foreignField: "event",
          as: "ticket",
        },
      },
      {
        $addFields: {
          minPrice: { $min: "$ticket.price" },
          totalTicketsSold: {
            $subtract: ["$totalSeats", "$availableSeats"],
          },
        },
      },
      { $sort: sortStage },
      { $skip: skip },
      { $limit: limit },
    ]);
    const totalEvents = await Event.countDocuments(filter);
    if (events.length === 0) {
      return Response(res, 200, "No Events found", []);
    }
    const totalPages = Math.ceil(totalEvents / limit);
    return Response(res, 200, "Events found", {
      events,
      pagination: {
        totalEvents,
        totalPages,
        currentPage: page,
        limit: limit,
      },
    });
  } catch (error) {
    console.log("failed to get events", error);
    return Response(res, 500, "Internal server error");
  }
}; 
// get organizer all events bookings
const GetOrganizerEventBookings = async(req,res)=>{
  try {
        const userId = req.user
        let {page=1,status} = req.query 
        page = parseInt(page)
        const  limit = 10 
        const skip = (page - 1) * limit 
        // check organiser is approved or exists
         const organizer = await Organizer.findOne({
           user: userId,
           isApproved: true,
         }).populate("user", "name email");
         if (!organizer) {
           return Response(res, 403, "Only approved organizers can access");
         }
         // get organizer events  
          const events = await Event.find({organizer:organizer._id}).select("_id")
          const eventIds = events.map((e)=>e._id) 
          if(eventIds.length === 0){
            return Response(res,200,"No Events found",[])
          }
         let filter = {event:{$in:eventIds}}
         if(status){
          filter.bookingStatus = status
         }
         const eventbookings = await Eventbooking.find(filter).sort({createdAt:1}).skip(skip).limit(limit).populate("user","name email phonenumber").populate("tickets.ticket","name price paxCount").populate("event", "title startDate city");
         const totalbookings = await Eventbooking.countDocuments(filter)
         const totalPages = Math.ceil(totalbookings / limit)
         if(eventbookings.length === 0){
          return Response(res,200,"No Bookings found",[])
         }
          return Response(res,200,"bookings found",{eventbookings,pagination:{
                 totalbookings,totalPages,currentpage:page,limit
                }})

    } catch (error) {
       console.log("failed to get bookings",error)
    return Response(res,500,"Internal server error")
    }
}


module.exports = {CreateEvent,EachEventDetails,getOrganizerAllevents,DeleteEvent,CancelEvent,GetAllEvents,GetOrganizerEventBookings};

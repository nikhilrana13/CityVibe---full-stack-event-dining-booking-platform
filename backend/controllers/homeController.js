const Event = require("../models/eventmodel.js");
const Response = require("../utils/responsehandler.js");
const moment = require("moment-timezone")

const Home = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return Response(res, 400, "City is required");
    }
    const todaydate = moment().tz("Asia/Kolkata").startOf("day").toDate()
    const cityFilter = {
      eventIsActive: true,
       $or: [
        { endDate: { $ne: null, $gte: todaydate } },
        { endDate: null, startDate: { $gte: todaydate } }
          ],
      city: { $regex: new RegExp(city, "i") },
    };
    // trending
    const trending = await Event.aggregate([
      { $match: cityFilter },
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
          ticketsSold: {
            $subtract: ["$totalSeats", "$availableSeats"],
          },
        },
      },
      { $sort: { ticketsSold: -1 } },
      { $limit: 10 },
      {
        $project: {
          title: 1,
          coverimage: 1,
          startDate: 1,
          endDate: 1,
          city: 1,
          minPrice: 1,
          venue: 1,
          starttime:1,
          location: 1,
        },
      },
    ]);
    // music event
    const music = await Event.aggregate([
      { $match: { ...cityFilter, category: "music" } },
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
        },
      },
      { $limit: 10 },
      {
        $project: {
          title: 1,
          coverimage: 1,
          startDate: 1,
          starttime: 1,
          endDate: 1,
          city: 1,
          minPrice: 1,
          venue: 1,
          location: 1,
        },
      },
    ]);
    // this week
    const today = new Date();
    const weekEnd = new Date();
    weekEnd.setDate(today.getDate() + 7);
    const thisWeek = await Event.aggregate([
      {
        $match: {
          ...cityFilter,
          startDate: { $gte: today, $lte: weekEnd },
        },
      },
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
        },
      },
      { $limit: 10 },
      {
        $project: {
          title: 1,
          coverimage: 1,
          startDate: 1,
          starttime: 1,
          endDate: 1,
          city: 1,
          minPrice: 1,
          venue: 1,
          location: 1,
        },
      },
    ]);
    //  Comedy
    const comedy = await Event.aggregate([
      { $match: { ...cityFilter, category: "comedy" } },
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
        },
      },
      { $limit: 10 },
      {
        $project: {
          title: 1,
          coverimage: 1,
          startDate: 1,
          starttime: 1,
          endDate: 1,
          city: 1,
          minPrice: 1,
          venue: 1,
          location: 1,
        },
      },
    ]);
    // india top's events
    const topCities = ["Delhi", "Mumbai", "Bangalore", "Chandigarh","Hyderabad","Kolkata","Pune","Gurgaon","Noida","Ahmedabad"];
    const indiasTopEvents = await Event.aggregate([
      {
        $match: {
          eventIsActive: true,
           $or: [
        { endDate: { $ne: null, $gte: todaydate } },
        { endDate: null, startDate: { $gte: todaydate } }
          ],
          city: {$in:topCities.map(c => new RegExp(`^${c}$`, "i"))},
        },
      },
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
          ticketsSold: {
            $subtract: ["$totalSeats", "$availableSeats"],
          },
        },
      },
      { $sort: { ticketsSold: -1 } },
      { $limit: 10 },
      {
        $project: {
          title: 1,
          coverimage: 1,
          city: 1,
          startDate: 1,
          endDate:1,
          venue: 1,
          starttime:1,
          minPrice: 1,
          location:1
        },
      },
    ]);
    return Response(res, 200, "Homepage api's data", {
      trending,
      music,
      thisWeek,
      comedy,
      indiasTopEvents
    });
  } catch (error) {
    console.log("failed to get home page data", error);
    return Response(res, 500, "Internal server error");
  }
};

module.exports = { Home };

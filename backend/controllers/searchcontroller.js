const normalizeCityKeyword = require("../helpers/normalizeCityKeyword.js");
const Event = require("../models/eventmodel.js");
const Restaurant = require("../models/restaurantmodel.js");
const cityClusters = require("../utils/cityCluster.js");
const Response = require("../utils/responsehandler.js");
const moment = require("moment-timezone")

// find result based on query trending mixed trending events trending restaurant search results
const Search = async (req, res) => {
  try {
    const { type, city, query } = req.query;
    if (!type || !city) {
      return Response(res, 400, "Type and city is Required");
    }
    const normalizedCity = normalizeCityKeyword(city)
    const cluster = cityClusters[normalizedCity] || [normalizedCity]
    // safer version
    const escapeRegex = (text) =>text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const cityRegexArray = cluster.map(c => new RegExp(`^${escapeRegex(c)}$`, "i"))
    const isTrending = !query; // if no query show trending
    const today = moment().tz("Asia/Kolkata").startOf("day").toDate();
    // event
    if (type === "event") {
      const filter = {
        eventIsActive: true,
        $or: [
        { endDate: { $ne: null, $gte: today } },
        { endDate: null, startDate: { $gte: today } }
          ],
        city: {$in:cityRegexArray},
      };
      if (!isTrending) {
        filter.title = { $regex: new RegExp(query, "i") };
      }
      let events;
      if (isTrending) {
        // trending by tickets sold
        events = await Event.aggregate([
          { $match: filter },
          {
            $addFields: {
              ticketsSold: {
                $subtract: ["$totalSeats", "$availableSeats"],
              },
            },
          },
          { $sort: { ticketsSold: -1 } },
          { $limit: 20 },
          {
            $project: {
              title: 1,
              city: 1,
              coverimage: 1,
              startDate: 1,
              _id: 1,
            },
          },
        ]);
      } else {
        events = await Event.find(filter)
          .limit(20)
          .select("title city coverimage startDate ticketsSold");
      }
      const formattedEvents = events.map((event) => ({
        ...(event.toObject ? event.toObject() : event),
        type: "event",
      }));
      return Response(res, 200, "Events found", formattedEvents);
    }
    // dining
    if (type === "dining") {
      const filter = {
      isActive: true,
        city: {$in:cityRegexArray},
      };

      if (!isTrending) {
        filter.name = { $regex: new RegExp(query, "i") };
      }
      const restaurants = await Restaurant.find(filter)
        .limit(20)
        .select("name images city")
        .slice("images", 1)
        .sort(isTrending ? { createdAt: -1 } : {});
      if (restaurants.length === 0) {
        return Response(res, 200, "No Restaurants found in Your location", []);
      }
      const formattedRestaurants = restaurants.map((res) => ({
        ...(res.toObject ? res.toObject() : res),
        type: "dining",
      }));
      return Response(res, 200, "Restaurant found", formattedRestaurants);
    }
    if (type === "all") {
      const eventFilter = {
        eventIsActive: true,
        $or: [
        { endDate: { $ne: null, $gte: today } },
        { endDate: null, startDate: { $gte: today } }
     ],
        city: {$in:cityRegexArray},
      };
      const restaurantFilter = {
        isActive: true,
        city: {$in:cityRegexArray},
      };
      if (!isTrending) {
        eventFilter.title = { $regex: new RegExp(query, "i") };
        restaurantFilter.name = { $regex: new RegExp(query, "i") };
      }

      const [events, restaurants] = await Promise.all([
        isTrending
          ? Event.aggregate([
              { $match: eventFilter },
              {
                $addFields: {
                  ticketsSold: {
                    $subtract: ["$totalSeats", "$availableSeats"],
                  },
                },
              },
              { $sort: { ticketsSold: -1 } },
              { $limit: 15 },
              {
                $project: {
                  title: 1,
                  city: 1,
                  coverimage: 1,
                  startDate: 1,
                  _id: 1,
                },
              },
            ])
          : Event.find(eventFilter)
              .limit(15)
              .select("title city coverimage startDate ticketsSold")
              .sort({ startDate: 1 }),
        Restaurant.find(restaurantFilter)
          .limit(15)
          .select("name city images")
          .slice("images", 1)
          .sort(isTrending ? { createdAt: -1 } : {}),
      ]);
      // add type field
      const formattedEvents = events.map((event) => ({
        ...(event.toObject ? event.toObject() : event),
        type: "event",
      }));
      const formattedRestaurants = restaurants.map((res) => ({
        ...(res.toObject ? res.toObject() : res),
        type: "restaurant",
      }));
      const combinedResults = [...formattedEvents,...formattedRestaurants]
      return Response(res, 200, "Results found", combinedResults)
    }
    return Response(res, 400, "No Results found");
  } catch (error) {
    console.log("Search error", error);
    return Response(res, 500, "Internal server error");
  }
};

module.exports = { Search };

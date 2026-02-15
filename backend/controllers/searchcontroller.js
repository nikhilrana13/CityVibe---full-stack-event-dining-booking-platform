const Event = require("../models/eventmodel.js");
const Restaurant = require("../models/restaurantmodel.js");
const Response = require("../utils/responsehandler.js");

// find result based on query trending mixed trending events trending restaurant search results
const Search = async (req, res) => {
  try {
    const { type, city, query } = req.query;
    if (!type || !city) {
      return Response(res, 400, "Type and city is Required");
    }
    const isTrending = !query; // if no query show trending
    // event
    if (type === "event") {
      const filter = {
        eventIsActive: true,
        city: { $regex: new RegExp(city, "i") },
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
      return Response(res, 200, "Events found", events);
    }
    // dining
    if (type === "dining") {
      const filter = {
        isActive: true,
        city: { $regex: new RegExp(city, "i") },
      };

      if (!isTrending) {
        filter.name = { $regex: new RegExp(query, "i") };
      }
      const restaurants = await Restaurant.find(filter)
        .limit(20)
        .select("name images")
        .slice("images", 1)
        .sort(isTrending ? { createdAt: -1 } : {});
      if (restaurants.length === 0) {
        return Response(res, 200, "No Restaurants found in Your location", []);
      }
      return Response(res, 200, "Restaurant found", restaurants);
    }
    if (type === "all") {
      const eventFilter = {
        eventIsActive: true,
        city: { $regex: new RegExp(city, "i") },
      };
      const restaurantFilter = {
        isActive: true,
        city: { $regex: new RegExp(city, "i") },
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
          .select("name images")
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
      return Response(res, 200, "Results found", {
        results: [...formattedEvents, ...formattedRestaurants],
      });
    }
    return Response(res, 400, "No Results found");
  } catch (error) {
    console.log("Search error", error);
    return Response(res, 500, "Internal server error");
  }
};

module.exports = { Search };

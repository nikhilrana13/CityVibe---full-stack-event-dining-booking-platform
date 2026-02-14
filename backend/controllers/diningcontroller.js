const Organizer = require("../models/organizermodel.js");
const Restaurant = require("../models/restaurantmodel.js");
const Response = require("../utils/responsehandler.js");
const cloudinary = require("../config/cloudinary.js");
const sharp = require("sharp");

// create restaurant
const CreateRestaurant = async (req, res) => {
  try {
    const userId = req.user;
    let {
      name,
      description,
      city,
      location,
      address,
      contactnumbers,
      averagePrice,
      openingTime,
      closingTime,
      cuisine,
      availablefacility,
    } = req.body;
    const files = req.files || [];
    //required fields validation
    const allowedFields = [
      "name",
      "city",
      "location",
      "address",
      "openingTime",
      "closingTime",
    ];
    for (let field of allowedFields) {
      if (!req.body[field]) {
        return Response(res, 400, `${field} is Required`);
      }
    }
    // parse contact number if come as string
    if (typeof contactnumbers === "string") {
      try {
        contactnumbers = JSON.parse(contactnumbers);
      } catch (err) {
        return Response(res, 400, "Invalid contact numbers format");
      }
    }
    if (!contactnumbers || contactnumbers.length === 0) {
      return Response(res, 400, "Please atleast add one contact number");
    }
    // parse cuisine if come as string
    if (typeof cuisine === "string") {
      try {
        cuisine = JSON.parse(cuisine);
      } catch (err) {
        return Response(res, 400, "Invalid cuisine format");
      }
    }
    // parse available facility if come as string
    if (typeof availablefacility === "string") {
      try {
        availablefacility = JSON.parse(availablefacility);
      } catch (err) {
        return Response(res, 400, "Invalid availabel facility format");
      }
    }
    if (!files || files.length < 5) {
      return Response(res, 400, "At least 5 images is Required");
    }
    // check organiser is approved or exists
    const organizer = await Organizer.findOne({
      user: userId,
      isApproved: true,
    });
    if (!organizer) {
      return Response(
        res,
        403,
        "Only approved organizers can create restaurant",
      );
    }
    // check already list a restaurant or not
    const existingRestaurant = await Restaurant.findOne({
      organizer: organizer._id,
    });
    if (existingRestaurant) {
      return Response(res, 400, "You already have a restaurant listed");
    }
    let imagesurl = [];
    for (let file of files) {
      try {
        //  optimize image
        const optimizedimage = await sharp(file.buffer)
          .resize({ width: 500 })
          .webp({ quality: 80 })
          .toBuffer();
        const imageBase64 = `data:image/webp;base64,${optimizedimage.toString("base64")}`;
        const cloudresponse = await cloudinary.uploader.upload(imageBase64, {
          folder: "city-vibe-organizer-restaurant-images",
          resource_type: "image",
        });
        imagesurl.push(cloudresponse.secure_url);
      } catch (error) {
        console.log("cloudinary upload error", error);
        return Response(res, 500, "Image upload failed");
      }
    }
    // create restaurant
    const restaurant = await Restaurant.create({
      organizer: organizer._id,
      name,
      description,
      cuisine,
      city,
      location,
      address,
      contactnumbers,
      availablefacility: availablefacility || [],
      openingTime,
      closingTime,
      averagePrice,
      images: imagesurl,
    });
    return Response(res, 200, "Restaurant listed successfully", { restaurant });
  } catch (error) {
    console.log("failed to create restaurant", error);
    return Response(res, 500, "Internal server error");
  }
};
// get each restaurant details
const getEachRestaurantDetails = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return Response(res, 404, "Restaurant not found");
    }
    return Response(res, 200, "Restaurant details found", { restaurant });
  } catch (error) {
    console.log("failed to get restaurant details", error);
    return Response(res, 500, "Internal server error");
  }
};
// get organizer restaurant
const GetOrganizerRestaurant = async (req, res) => {
  try {
    const userId = req.user;
    // check organiser is approved or exists
    const organizer = await Organizer.findOne({user: userId,isApproved: true,});
    if (!organizer) {
      return Response(res,403,"Only approved organizers can create restaurant",);
    }
    // find restaurant exists or not 
    const restaurant = await Restaurant.findOne({organizer:organizer._id})
    if(!restaurant){
        return Response(res,400,"Restaurant not found")
    }
    return Response(res,200,"Restaurant found",{restaurant})
  } catch (error) {
    console.log("failed to get organizer restaurant", error);
    return Response(res, 500, "Internal server error");
  }
};
// delete restaurant
const DeleteRestaurant = async (req, res) => {
  try {
    const userId = req.user;
    const restaurantId = req.params.id;
    // check organiser is approved or exists
    const organizer = await Organizer.findOne({
      user: userId,
      isApproved: true,
    }).populate("user", "name email");
    if (!organizer) {
      return Response(res, 403, "Only approved organizers can access");
    }
    // find event
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return Response(res, 404, "Restaurant not found");
    }
    // check event belongs to this organizer
    if (restaurant.organizer.toString() !== organizer._id.toString()) {
      return Response(res, 403, "You are not authorized to delete this restaurant");
    }
    await Restaurant.findByIdAndDelete(restaurant);
    return Response(res, 200, "Restaurant Deleted Successfully");
  } catch (error) {
    console.error("Failed to delete restaurant", error);
    return Response(res, 500, "Internal server error");
  }
};







module.exports = { CreateRestaurant, getEachRestaurantDetails,GetOrganizerRestaurant,DeleteRestaurant};

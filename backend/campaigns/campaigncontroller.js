const User = require("../models/usermodel.js");
const cloudinary = require("../config/cloudinary.js");
const Campaign = require("../models/campaignmodel.js");

// create campaigns
const CreateCampaign = async (req, res) => {
  try {
    const adminId = req.user;
    let {title,discountType,discountValue,startDate,endDate,usageLimit,maxDiscount,minOrderAmount,perUserLimit,displayOnHome,
      applicableFor} = req.body;
    // Normalize FormData boolean
    displayOnHome = displayOnHome === true || displayOnHome === "true";

    let file = req.file;
    // checks admin exists or not
    const admin = await User.findById(adminId);
    if (!admin) {
      return Response(res, 404, "Admin not found");
    }
    if (admin.role !== "admin") {
      return Response(res, 403, "Access denied Admin only");
    }
    // validations
    const allowedFields = [
      "title",
      "discountType",
      "discountValue",
      "startDate",
      "endDate",
      "usageLimit",
    ];

    for (let field of allowedFields) {
      if (
        req.body[field] === undefined ||
        req.body[field] === null ||
        String(req.body[field]).trim() === ""
      ) {
        return Response(res, 400, `${field} is Required`);
      }
    }
    // title validation
    if (title.length > 40) {
      return Response(res, 400, "Only 40 characters allowed");
    }
    // discountType validation
    if (!["percentage", "flat"].includes(discountType)) {
      return Response(res, 400, "Invalid discount type");
    }
    // Discount value
    if (discountValue <= 0) {
      return Response(res, 400, "Invalid discountValue");
    }
    // percentage
    if (discountType === "percentage") {
      if (discountValue <= 0 || discountValue > 100) {
        return Response(res, 400, "Invalid percentage");
      }
      if (
        maxDiscount !== undefined &&
        maxDiscount !== null &&
        maxDiscount <= 0
      ) {
        return Response(res, 400, "Invalid maxDiscount");
      }
    }
    if (discountType === "flat") {
      maxDiscount = null;
    }
    // per user limit
    if (perUserLimit < 1) {
      return Response(res, 400, "Invalid perUserLimit");
    }
    // usage limit
    if (usageLimit < 1) {
      return Response(res, 400, "Invalid usageLimit");
    }
    if (perUserLimit > usageLimit) {
      return Response(
        res,
        400,
        "perUserLimit cannot be greater than usageLimit",
      );
    }
    // min order amount
    if (minOrderAmount < 0) {
      return Response(res, 400, "Invalid minOrderAmount");
    }
    // applicable for
    if (!["all", "first_booking", "inactive_users"].includes(applicableFor)) {
      return Response(res, 400, "Invalid applicable for");
    }

    // date validation
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return Response(res, 400, "Invalid date format");
    }

    if (end <= start) {
      return Response(res, 400, "endDate must be after startDate");
    }
    // banner validation
    if (displayOnHome === true) {
      if (!file) {
        return Response(res, 400, "Please Upload Banner image");
      }
    }
    // check campaign already exists or not
    const existing = await Campaign.findOne({
      title: title.trim().toLowerCase(),
      startDate: start,
      endDate: end,
    });
    if (existing) {
      return Response(res, 400, "Campaign already exists");
    }
    // upload image to cloudinary
    let bannerimg = null;
    if (file) {
      const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      const cloudResponse = await cloudinary.uploader.upload(imageBase64, {
        folder: "city-vibe-campaigns-banner-images",
        resource_type: "image",
      });
      bannerimg = {
        url: cloudResponse.secure_url,
        fileId: cloudResponse.public_id,
      };
    } 
    // create campaign
    const campaign = await Campaign.create({
      adminId: adminId,
      title: title.trim().toLowerCase(),
      discountType,
      discountValue,
      maxDiscount: maxDiscount || null,
      minOrderAmount: minOrderAmount || 0,
      applicableFor,
      startDate: start,
      endDate: end,
      bannerImageUrl: bannerimg,
      displayOnHome,
      perUserLimit,
      usageLimit,
    });
    return Response(res, 201, "Campaign created Successfully", {
      campaign: campaign,
    });
  } catch (error) {
    console.error("failed to create campaign", error);
    return Response(res, 500, "Internal server error");
  }
};


module.exports = {CreateCampaign}
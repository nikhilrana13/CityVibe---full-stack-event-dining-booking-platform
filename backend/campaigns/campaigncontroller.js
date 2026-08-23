const User = require("../models/usermodel.js");
const cloudinary = require("../config/cloudinary.js");
const Campaign = require("../models/campaignmodel.js");
const Response = require("../utils/responsehandler.js");
const CalculateOffer = require("../helpers/calculateOffer.js")

// create campaigns
const CreateCampaign = async (req, res) => {
  try {
    const adminId = req.user;
    let {
      title,
      discountType,
      discountValue,
      startDate,
      endDate,
      usageLimit,
      maxDiscount,
      minOrderAmount,
      perUserLimit,
      displayOnHome,
      applicableFor,
    } = req.body;
    // Normalize FormData boolean
    displayOnHome = displayOnHome === true || displayOnHome === "true";

    let file = req.file;
    // checks admin exists or not
    const admin = await User.findById(adminId);
    if (!admin) {
      return Response(res, 404, "Admin not found");
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
// Get all campaigns for admin
const GetAllCampaign = async (req, res) => {
  try {
    const adminId = req.user;
    // checks admin exists or not
    const admin = await User.findById(adminId);
    if (!admin) {
      return Response(res, 404, "Admin not found");
    }
    const campaigns = await Campaign.find({ adminId: adminId });
    if (!campaigns) {
      return Response(res, 200, "No Campaigns found", []);
    }
    return Response(res, 200, "Campaigns found", { campaigns });
  } catch (error) {
    console.error("failed to get campaigns", error);
    return Response(res, 500, "Internal server error");
  }
};
// update campaigns
const UpdateCampaignDetails = async (req, res) => {
  try {
    const adminId = req.user;
    const campaignId = req.params.id;
    let { title, startDate, endDate, displayOnHome, usageLimit } = req.body;
    let file = req.file;
    // checks admin exists or not
    const admin = await User.findById(adminId);
    if (!admin) {
      return Response(res, 404, "Admin not found");
    }
    // find campaign exist or not
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return Response(res, 400, "Campaign not found");
    }
    // image
    let bannerimg = campaign?.bannerImageUrl;
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
    // update data
    let updateData = {};
    let start = campaign.startDate;
    let end = campaign.endDate;
    if (title !== undefined) {
      title = title.trim();
      if (title.length > 40) {
        return Response(res, 400, "Only 40 characters allowed");
      }
      updateData.title = title.toLowerCase();
    }
    if (displayOnHome !== undefined) {
      // Normalize FormData boolean
      displayOnHome = displayOnHome === true || displayOnHome === "true";
      updateData.displayOnHome = displayOnHome;
    }

    if (startDate !== undefined) {
      start = new Date(startDate);

      if (isNaN(start.getTime())) {
        return Response(res, 400, "Invalid startDate format");
      }
      updateData.startDate = start;
    }
    if (endDate !== undefined) {
      end = new Date(endDate);

      if (isNaN(end.getTime())) {
        return Response(res, 400, "Invalid endDate format");
      }
      updateData.endDate = end;
    }
    if (end <= start) {
      return Response(res, 400, "endDate must be after startDate");
    }
    if (usageLimit !== undefined) {
      if (usageLimit < 1) {
        return Response(res, 400, "Invalid usageLimit");
      }
      if (usageLimit < campaign.usedCount) {
        return Response(
          res,
          400,
          `Usage limit cannot be less than used count (${campaign.usedCount})`,
        );
      }
      updateData.usageLimit = usageLimit;
    }
    if (file) updateData.bannerImageUrl = bannerimg;
    if (Object.keys(updateData).length === 0) {
      return Response(res, 400, "No fields provided to update");
    }
    // check campaign already exists or not
    const existing = await Campaign.findOne({
      _id: { $ne: campaignId },
      title: updateData.title || campaign.title,
      startDate: updateData.startDate || campaign.startDate,
      endDate: updateData.endDate || campaign.endDate,
    });
    if (existing) {
      return Response(res, 400, "Campaign already exists");
    }
    // update campaign
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      updateData,
      { new: true, runValidators: true },
    );
    return Response(res, 200, "Updated successfully", {
      campaign: updatedCampaign,
    });
  } catch (error) {
    console.error("failed to update campaign", error);
    return Response(res, 500, "Internal server error");
  }
};
// enable and disable campaign
const ToggleCampaignStatus = async (req, res) => {
  try {
    const adminId = req.user;
    const campaignId = req.params.id;
    const admin = await User.findById(adminId);
    if (!admin || admin.role !== "admin") {
      return Response(res, 403, "Forbidden");
    }
    const campaign = await Campaign.findById(campaignId);
    // console.log("campaign",campaign)
    if (!campaign) {
      return Response(res, 404, "Campaign not found");
    }
    campaign.isActive = !campaign.isActive;
    await campaign.save();
    return Response(res, 200, "Campaign status updated", {
      isActive: campaign.isActive,
    });
  } catch (error) {
    console.error("Toggle campaign error", error);
    return Response(res, 500, "Internal server error");
  }
};
// apply offers validation
const ApplyOffer = async(req, res) => {
  try {
    const userId = req.user;
    let { campaignId, eventId, tickets } = req.body;
    if (!campaignId || !eventId) {
      return Response(res, 400, "Event and Campaign Id is required");
    }
    // tickets validation
    if (!tickets) {
      return Response(res, 400, "Tickets is required");
    }
    // parse if tickets come as string
    if (typeof tickets === "string") {
      try {
        tickets = JSON.parse(tickets);
      } catch (error) {
        return Response(res, 400, "Invalid tickets format", error);
      }
    }
    if (!Array.isArray(tickets) || tickets.length === 0) {
      return Response(res, 400, "At least one ticket must be selected");
    }
    // apply offer
    let result;
    try {
      result = await CalculateOffer({
        userId,
        campaignId,
        eventId,
        tickets
      });
    } catch (err) {
      return Response(res, 400, err.message);
    }
    return Response(res, 200, "Offer applied successfully",{
       totalAmount: result.subtotal,
       finalAmount: result.finalAmount,
       campaign: {
       id: result.campaignId,
       title: result.campaignTitle,
       discountType: result.discountType,
       discountValue: result.discountValue,
      },
      savings: result.discountAmount,
    });

  } catch (error) {
    console.error("failed to Apply offer",error)
    Response(res,500,"Internal server error")
  }
};

module.exports = {CreateCampaign,GetAllCampaign,UpdateCampaignDetails,ToggleCampaignStatus,ApplyOffer};

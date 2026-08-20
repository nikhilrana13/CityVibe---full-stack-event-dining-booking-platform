const mongoose = require("mongoose");

const campaignUsageSchema = new mongoose.Schema(
  {
    campaignId: {type: mongoose.Types.ObjectId,ref: "Campaign",required: true,},
    userId: {type: mongoose.Types.ObjectId,ref: "User",required: true,},
    bookingId: {type: mongoose.Types.ObjectId,ref: "Booking",required: true,},
    discountAmount: {type: Number,required: true,min: 0,},
    usedAt: {type: Date,default: Date.now,},
  },{  timestamps: true,});

const CampaignUsage = mongoose.model("CampaignUsage",campaignUsageSchema);

module.exports = CampaignUsage;
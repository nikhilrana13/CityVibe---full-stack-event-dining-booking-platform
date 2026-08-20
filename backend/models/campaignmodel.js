const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  adminId: { type: mongoose.Types.ObjectId, ref: "Admin", required: true },
  title: { type: String, required: true, maxlength: 40 },
  discountType: { type: String, enum: ["percentage", "flat"], required: true },
  discountValue: { type: Number, required: true },
  maxDiscount: { type: Number, default: null }, // for % cap
  minOrderAmount: { type: Number, default: 0 },
  bannerImageurl:{url:String,fileId:String},
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  perUserLimit:{type:Number,default:1},
  usageLimit:{type:Number,required:true},
  usedCount:{type:Number,default:0},
  displayOnHome:{type:Boolean,default:false},
  applicableFor:{type:String,enum:["all","first_booking","inactive_users"],default:"all"}
},{timestamps:true});

const Campaign = mongoose.model("Campaign",campaignSchema)
module.exports = Campaign

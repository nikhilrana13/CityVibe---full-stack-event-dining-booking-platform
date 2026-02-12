const mongoose = require("mongoose");
const organizerschema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true,unique: true},
    businessName: { type: String, required: true },
    businessEmail: { type: String, required: true },
    businessPhone: { type: String, required: true },
    panNumber: { type: String, required: true ,match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/},
    panFrontImage: { type: String, required: true },
    panBackImage: { type: String, required: true },
    bankAccountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true, match:  /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/},
    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    isVerified: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true },
);
const Organizer = mongoose.model("organizer", organizerschema);
module.exports = Organizer;

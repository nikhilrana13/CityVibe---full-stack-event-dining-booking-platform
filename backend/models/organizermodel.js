const mongoose = require("mongoose");
const organizerschema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true},
    businessName: { type: String, required: true },
    businessEmail: { type: String, required: true ,lowercase:true},
    businessPhone: { type: String, required: true },
    panNumber: { type: String, required: true },
    pancardimage: { type: String, required: true },
    bankAccountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true},
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

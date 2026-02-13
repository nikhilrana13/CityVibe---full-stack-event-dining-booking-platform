const Organizer = require("../models/organizermodel.js");
const User = require("../models/usermodel.js");
const Response = require("../utils/responsehandler.js");
const sharp = require("sharp");
const cloudinary = require("../config/cloudinary.js");



// onboarding organizer
const OnBoardingOrganizer = async (req, res) => {
  try {
    const userId = req.user;
    const {businessName,businessEmail,businessPhone,panNumber,bankAccountNumber,ifscCode, } = req.body;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // pan card front and back images
    const file = req.file;
    //validation
    if (
      !businessName ||
      !businessEmail ||
      !businessPhone ||
      !panNumber ||
      !bankAccountNumber ||
      !ifscCode
    ) {
      return Response(res, 400, "All fields is required");
    }
    if (!panRegex.test(panNumber)) {
      return Response(res, 400, "Invalid Pan Number");
    }
    if (!ifscRegex.test(ifscCode)) {
      return Response(res, 400, "Invalid ifsc Code");
    }
    if (!emailRegex.test(businessEmail)) {
      return Response(res, 400, "Invalid Business email");
    }
    if (businessPhone.length < 10) {
     return Response(res, 400, "Invalid business phone");
    }

    if (!file) {
      return Response(res, 400, "Please Upload pan card image");
    }
    // check user exists or not
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 404, "User not found");
    }
    // check organizer already exists
    const organizerexists = await Organizer.findOne({ user: user?._id });
    if (organizerexists) {
      return Response(res, 400, "Organizer request already submitted");
    }
    //optimized pan card image using sharp
    const optimizedImage = await sharp(file.buffer)
      .resize({ width: 500})
      .webp({ quality: 80 })
      .toBuffer();
    const imageBase64 = `data:image/webp;base64,${optimizedImage.toString("base64")}`;
    const cloudResponse = await cloudinary.uploader.upload(imageBase64, {
      folder: "city-vibe-organizer-documents",
      resource_type: "image",
    });
    //Create organizer model
    const organizer = await Organizer.create({
      user: user._id,
      businessEmail,
      businessName,
      businessPhone,
      panNumber,
      bankAccountNumber,
      ifscCode,
      pancardimage: cloudResponse.secure_url,
      verificationStatus: "pending",
    });
    user.hasOrganizerAccount = true;
    await user.save();
    return Response(res, 200, "OnBoarding successful", { organizer });
  } catch (error) {
    console.log("failed to create organizer", error);
    return Response(res, 500, "Internal server error");
  }
};



module.exports = OnBoardingOrganizer 




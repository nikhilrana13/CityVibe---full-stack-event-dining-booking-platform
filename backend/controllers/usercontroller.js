const User = require("../models/usermodel.js");
const Response = require("../utils/responsehandler.js");
const cloudinary = require("../config/cloudinary.js");

const UpdateUserProfile = async (req, res) => {
  try {
    const userId = req.user;
    const { name, phonenumber, dob, gender } = req.body;
    const file = req.file;
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 404, "User not found");
    }
    let updateData = {};
    if (name) updateData.name = name;
    if (phonenumber) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phonenumber)) {
        return Response(res, 400, "Invalid phone number");
      }
      updateData.phonenumber = phonenumber;
    }
    if (file) {
      const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      const cloudResponse = await cloudinary.uploader.upload(imageBase64, {
        folder: "city-vibe-users-images",
        resource_type: "image",
      });
      updateData.profilepic = cloudResponse.secure_url;
    }
    if (dob) {
      const dobDate = new Date(dob);
      if (dobDate > new Date()) {
        return Response(res, 400, "Invalid date of birth");
      }
       updata.dob = dobDate
    }
    if (gender){
    const allowedGenders = ["male", "female", "other"];
      if (!allowedGenders.includes(gender.toLowerCase())) {
        return Response(res, 400, "Invalid gender value");
      }
      updateData.gender = gender.toLowerCase();
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true },
    );
    return Response(res, 200, "Profile updated successfully", { updatedUser });
  } catch (error) {
    console.log("failed to update user profile", error);
    return Response(res, 500, "Internal server error");
  }
};

module.exports = UpdateUserProfile;

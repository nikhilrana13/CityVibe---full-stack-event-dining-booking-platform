const User = require("../models/usermodel");
const jwt = require("jsonwebtoken"); 
const Response = require("../utils/responsehandler");
const bcrypt = require("bcryptjs");
const AdminMapper = require("../mappers/adminmapper");


// verify firebase token login with phone
const verifyFirebaseToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return Response(res, 404, "Token is required");
    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;
    const phone = decoded.phone_number;
    let user = await User.findOne({
      $or: [{ uid }, { phonenumber: phone }]
    });
    if (!user) {
      user = await User.create({
        uid,
        provider: "phone",
        phonenumber: phone,
        role: "user"
      });
    }
    const jwttoken = jwt.sign({ id: user._id, role: user.role },process.env.JWT_SECRET_KEY,{ expiresIn: "1d" });
    res.cookie("token", jwttoken, { httpOnly: true,secure: true,sameSite:"none"});
    return Response(res, 201, "Login successfully", { user, token: jwttoken });
  } catch (error) {
    console.log("Failed to verify Firebase token", error);
    return Response(res, 500, "Internal server error");
  }
};
// login with google
const LoginWithGoogle = async (req, res) => {
  try {
    const { uid, name, email, picture } = req.user;
    const normalizedEmail = email.toLowerCase().trim();
    // Check user exists (email OR uid)
    let user = await User.findOne({$or: [{ email: normalizedEmail }, { uid }]});
    if (!user) {
      user = await User.create({
        uid,
        email: normalizedEmail,
        name,
        profilePic: picture,
        provider: "google",
        role: "user",
        isVerified: true
      });
    } else {
      // Update existing user
      user.uid = uid;
      user.isVerified = true;
      user.profilepic = picture;
      await user.save();
    }
    // Generate JWT
    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    return Response(res, 200, "Login successfully", {
      user,
      token: jwtToken
    });

  } catch (error) {
    console.log("Failed to login with google", error);
    return Response(res, 500, "Internal server error");
  }
};
// for admin login 
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.role !== "admin") {
      return Response(res, 401, "Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return Response(res, 401, "Invalid credentials");
    }
    const token = jwt.sign({ id: user._id, role: user.role },process.env.JWT_SECRET_KEY,{ expiresIn: "1d" });
    res.cookie("token", token, {httpOnly: true,secure:true,sameSite: "none"});

    return Response(res, 200, "Admin login successful",{admin:AdminMapper(user),token});

  } catch (error) {
    return Response(res, 500, "Internal server error");
  }
};

// logout
 const Logout = async(req,res)=>{
    try {
        
         res.clearCookie("token",{httpOnly:true,secure:true,sameSite:"none"})
         return Response(res,200,"Logout successfully")
    } catch (error) {
         console.error("failed to logout",error)
        return Response(res,500,"Internal server error")
    }
 }

 module.exports = {verifyFirebaseToken,LoginWithGoogle,Logout,adminLogin} 
 
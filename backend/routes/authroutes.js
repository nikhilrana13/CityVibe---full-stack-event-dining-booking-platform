const express = require("express") 
const { verifyFirebaseToken, LoginWithGoogle, adminLogin, Logout } = require("../controllers/AuthController.js")
const IsGoogleAuth = require("../middleware/IsGoogleAuth.js") 
const AuthMiddleware = require("../middleware/AuthMiddleware.js")
const router = express.Router()


// login with phone number 
router.post("/verify-firebase-token",verifyFirebaseToken) 
// login with google 
router.post("/google-login",IsGoogleAuth,LoginWithGoogle) 
// login for admin 
router.post("/admin-login",adminLogin)
// logout 
router.get("/logout",Logout)

// for test
router.post("/test-google", async (req, res) => {
  try {
    const fakeDecodedUser = {
      provider:"google",
      uid: "testuid123",
      email: "test@gmail.com",
      name: "Test User",
      picture: "test.jpg"
    };
    req.user = fakeDecodedUser;
    return LoginWithGoogle(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Test failed" });
  }
});

module.exports = router
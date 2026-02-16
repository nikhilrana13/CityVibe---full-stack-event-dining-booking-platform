const express = require("express")
const router = express.Router() 
const multer = require("multer")
const AuthMiddleware = require("../middleware/AuthMiddleware.js")
const UpdateUserProfile = require("../controllers/usercontroller.js")

// multer config
const storage = multer.memoryStorage()
const upload = multer({storage})


router.put("/updateprofile",AuthMiddleware,upload.single("profilepic"),UpdateUserProfile)

module.exports = router 
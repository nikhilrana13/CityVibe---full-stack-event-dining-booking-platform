const express = require("express")
const router = express.Router()
const multer = require("multer")
const AuthMiddleware = require("../middleware/AuthMiddleware.js")
const {OnBoardingOrganizer, UpdateBusinessProfile} = require("../controllers/organizercontroller.js")
const OrganizerAuth = require("../middleware/IsOrganizer.js")


// multer config
const storage = multer.memoryStorage()
const upload = multer({storage})

// routes 
router.post("/onboarding",AuthMiddleware,upload.single("pancardimage"),OnBoardingOrganizer)
router.put("/updateprofile",AuthMiddleware,OrganizerAuth,UpdateBusinessProfile)

module.exports = router
const express = require("express")
const router = express.Router()
const multer = require("multer")
const AuthMiddleware = require("../middleware/AuthMiddleware.js")
const OnBoardingOrganizer = require("../controllers/organizercontroller.js")


// multer config
const storage = multer.memoryStorage()
const upload = multer({storage})

// routes 
router.post("/onboarding",AuthMiddleware,upload.single("pancardimage"),OnBoardingOrganizer)

module.exports = router
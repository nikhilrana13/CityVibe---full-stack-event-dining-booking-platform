const express = require("express")
const router = express.Router()
const multer = require("multer")
const AuthMiddleware = require("../middleware/AuthMiddleware.js")
const {OnBoardingOrganizer, UpdateBusinessProfile, OrganizerDashboardStats, EventManagementStats, ManageDiningStats, EventBookingPageStats, DiningBookingPageStats} = require("../controllers/organizercontroller.js")
const OrganizerAuth = require("../middleware/IsOrganizer.js")


// multer config
const storage = multer.memoryStorage()
const upload = multer({storage})

// organizer dashboard routes 
router.post("/onboarding",AuthMiddleware,upload.single("pancardimage"),OnBoardingOrganizer)
router.put("/updateprofile",AuthMiddleware,OrganizerAuth,UpdateBusinessProfile)
router.get("/dashboard/stats",AuthMiddleware,OrganizerAuth,OrganizerDashboardStats)
router.get("/eventmanagement/stats",AuthMiddleware,OrganizerAuth,EventManagementStats) 
router.get("/diningmanagement/stats",AuthMiddleware,OrganizerAuth,ManageDiningStats)
router.get("/eventbooking/stats",AuthMiddleware,OrganizerAuth,EventBookingPageStats)
router.get("/diningbooking/stats",AuthMiddleware,OrganizerAuth,DiningBookingPageStats)


module.exports = router
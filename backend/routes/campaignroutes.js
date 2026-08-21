const express = require("express")
const router = express.Router();
const multer = require("multer");
const AuthMiddleware = require("../middleware/AuthMiddleware.js");
const IsAdmin = require("../middleware/IsAdmin");
const { CreateCampaign, GetAllCampaign, UpdateCampaignDetails, ToggleCampaignStatus } = require("../campaigns/campaigncontroller.js");


// multer config 
const storage = multer.memoryStorage()
const upload = multer({storage})


// routes
router.post("/create-campaign",AuthMiddleware,IsAdmin,upload.single("bannerImageUrl"),CreateCampaign)
router.get("/all",AuthMiddleware,IsAdmin,GetAllCampaign)
router.put("/update/:id",AuthMiddleware,IsAdmin,upload.single("bannerImageUrl"),UpdateCampaignDetails)
router.patch("/toggle/:id",AuthMiddleware,IsAdmin,ToggleCampaignStatus)


module.exports = router

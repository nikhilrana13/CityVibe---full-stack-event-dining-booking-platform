const express = require("express")
const router = express.Router();
const multer = require("multer");
const AuthMiddleware = require("../middleware/AuthMiddleware.js");
const IsAdmin = require("../middleware/IsAdmin");
const { CreateCampaign } = require("../campaigns/campaigncontroller.js");


// multer config 
const storage = multer.memoryStorage()
const upload = multer({storage})


// routes
router.post("/create-campaign",AuthMiddleware,IsAdmin,upload.single("bannerImageUrl"),CreateCampaign)


module.exports = router

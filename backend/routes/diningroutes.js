const express = require("express")
const router = express.Router()
const multer = require("multer")
const AuthMiddleware = require("../middleware/AuthMiddleware.js")
const OrganizerAuth = require("../middleware/IsOrganizer.js")
const { CreateRestaurant, getEachRestaurantDetails, GetOrganizerRestaurant, DeleteRestaurant } = require("../controllers/diningcontroller.js")


// multer config 
const storage = multer.memoryStorage()
const upload = multer({storage})

// organizer dashboard route
router.post("/restaurant/create",AuthMiddleware,OrganizerAuth,upload.array("images",6),CreateRestaurant)
router.get("/organizer/restaurant",AuthMiddleware,OrganizerAuth,GetOrganizerRestaurant)
router.delete("/restaurant/delete/:id",AuthMiddleware,OrganizerAuth,DeleteRestaurant)
// public 
router.get("/restaurant/details/:id",getEachRestaurantDetails)




module.exports = router
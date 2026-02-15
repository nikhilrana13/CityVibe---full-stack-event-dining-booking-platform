const express = require("express")
const router = express.Router()
const multer = require("multer")
const AuthMiddleware = require("../middleware/AuthMiddleware.js")
const OrganizerAuth = require("../middleware/IsOrganizer.js")
const { CreateRestaurant, getEachRestaurantDetails, GetOrganizerRestaurant, DeleteRestaurant, updateRestaurant, toggleEnableandDisableRestaurant, OrganizerDiningBookings } = require("../controllers/diningcontroller.js")


// multer config 
const storage = multer.memoryStorage()
const upload = multer({storage})

// organizer dashboard route
router.post("/restaurant/create",AuthMiddleware,OrganizerAuth,upload.array("images",6),CreateRestaurant)
router.get("/organizer/restaurant",AuthMiddleware,OrganizerAuth,GetOrganizerRestaurant)
router.get("/organizer/restaurant/bookings",AuthMiddleware,OrganizerAuth,OrganizerDiningBookings)
router.put("/restaurant/update/:id",AuthMiddleware,OrganizerAuth,upload.array("images",6),updateRestaurant)
router.put("/restaurant/toggle/:id",AuthMiddleware,OrganizerAuth,toggleEnableandDisableRestaurant)
router.delete("/restaurant/delete/:id",AuthMiddleware,OrganizerAuth,DeleteRestaurant)
// public 
router.get("/restaurant/details/:id",getEachRestaurantDetails)




module.exports = router
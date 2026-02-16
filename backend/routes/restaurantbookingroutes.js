const express = require("express")
const AuthMiddleware = require("../middleware/AuthMiddleware.js")
const {CreateRestaurantBooking,GetAvailableSlots, CancelBooking, UserallDiningbookings, GetDiningBookingDetail} = require("../controllers/restaurantbookingcontroller.js")
const router = express.Router()


// user dining restaurant api's 
router.post("/restaurant/create-booking",AuthMiddleware,CreateRestaurantBooking)
router.get("/restaurant/slots",GetAvailableSlots) 
router.get("/restaurant/userbookings",AuthMiddleware,UserallDiningbookings)
router.get("/restaurant/booking/:id",AuthMiddleware,GetDiningBookingDetail)
router.put("/restaurant/cancelbooking/:id",AuthMiddleware,CancelBooking)

// organizer dashboard restaurant api's

module.exports = router 

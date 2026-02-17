const express = require("express")
const AuthMiddleware = require("../middleware/AuthMiddleware.js")
const {CreateRestaurantBooking,GetAvailableSlots, CancelBooking, UserallDiningbookings, GetDiningBookingDetail} = require("../controllers/restaurantbookingcontroller.js")
const { BookingLimiter } = require("../middleware/ratelimiters.js")
const router = express.Router()


// user dining restaurant api's 
router.post("/restaurant/create-booking",BookingLimiter,AuthMiddleware,CreateRestaurantBooking)
router.get("/restaurant/slots",GetAvailableSlots) 
router.get("/restaurant/userbookings",AuthMiddleware,UserallDiningbookings)
router.get("/restaurant/booking/:id",AuthMiddleware,GetDiningBookingDetail)
router.put("/restaurant/cancelbooking/:id",BookingLimiter,AuthMiddleware,CancelBooking)

// organizer dashboard restaurant api's

module.exports = router 

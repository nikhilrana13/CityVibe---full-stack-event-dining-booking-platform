const express = require("express")
const AuthMiddleware = require("../middleware/AuthMiddleware.js")
const { CreateEventBooking, UpdatePaymentStatus, UserAllBookedEvents, GetEventBookingDetail, CancelEventBooking, VerifyTicket } = require("../controllers/eventbookingcontroller.js")
const OrganizerAuth = require("../middleware/IsOrganizer.js")
const { BookingLimiter } = require("../middleware/ratelimiters.js")
const router = express.Router()


//user event book api's
router.post("/event/create-booking",BookingLimiter,AuthMiddleware,CreateEventBooking)
router.get("/event/userbookings",AuthMiddleware,UserAllBookedEvents)
router.put("/event/cancelbooking/:id",BookingLimiter,AuthMiddleware,CancelEventBooking)
router.get("/event/booking/:id",AuthMiddleware,GetEventBookingDetail)
// payment mark paid only for testing 
router.put("/event/booking/marksuccess/:id",AuthMiddleware,UpdatePaymentStatus)
router.put("/event/verify-ticket",AuthMiddleware,OrganizerAuth,VerifyTicket)


module.exports = router  

const express = require("express")
const AuthMiddleware = require("../middleware/AuthMiddleware.js")
const { CreateEventBooking, UpdatePaymentStatus, UserAllBookedEvents, GetEventBookingDetail, CancelEventBooking, VerifyTicket } = require("../controllers/eventbookingcontroller.js")
const OrganizerAuth = require("../middleware/IsOrganizer.js")
const router = express.Router()


//user event book api's
router.post("/event/create-booking",AuthMiddleware,CreateEventBooking)
router.get("/event/bookings",AuthMiddleware,UserAllBookedEvents)
router.put("/event/cancelbooking/:id",AuthMiddleware,CancelEventBooking)
router.get("/event/booking/:id",AuthMiddleware,GetEventBookingDetail)
// payment mark paid only for testing 
router.put("/event/booking/marksuccess/:id",AuthMiddleware,UpdatePaymentStatus)
router.put("/event/verify-ticket",AuthMiddleware,OrganizerAuth,VerifyTicket)


module.exports = router  

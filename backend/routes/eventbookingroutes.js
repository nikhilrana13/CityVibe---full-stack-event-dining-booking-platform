const express = require("express")
const AuthMiddleware = require("../middleware/AuthMiddleware.js")
const { CreateEventBooking, UpdatePaymentStatus } = require("../controllers/eventbookingcontroller.js")
const router = express.Router()


//user event book api's
router.post("/event/create-booking",AuthMiddleware,CreateEventBooking)
// payment mark paid only for testing 
router.put("/event/booking/marksuccess/:id",AuthMiddleware,UpdatePaymentStatus)



module.exports = router  

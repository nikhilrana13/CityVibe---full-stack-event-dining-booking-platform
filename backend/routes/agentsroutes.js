const express = require("express")
const { BookingAgent } = require("../agents/bookingAgent.js")
const AuthMiddleware = require("../middleware/AuthMiddleware.js")
const router = express.Router()



router.post("/booking-agent",AuthMiddleware,BookingAgent)


module.exports = router
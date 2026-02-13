const express = require("express")
const AuthMiddleware = require("../middleware/AuthMiddleware.js")
const IsAdmin = require("../middleware/IsAdmin.js")
const {GetOrganizers, ApproveandRejectorganizer} = require("../controllers/admincontroller.js")
const router = express.Router()


// admin routes 
router.get("/organizers",AuthMiddleware,IsAdmin,GetOrganizers)
router.put("/organizer/verify",AuthMiddleware,IsAdmin,ApproveandRejectorganizer)


module.exports = router
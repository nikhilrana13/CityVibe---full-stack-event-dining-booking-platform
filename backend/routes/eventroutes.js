const express = require("express")
const router = express.Router()
const multer = require("multer")
const AuthMiddleware = require("../middleware/AuthMiddleware.js")
const { CreateEvent, EachEventDetails, getOrganizerAllevents, DeleteEvent, CancelEvent, GetAllEvents } = require("../controllers/eventcontroller.js")
const OrganizerAuth = require("../middleware/IsOrganizer.js")


const storage = multer.memoryStorage()
const upload = multer({storage})

router.post("/create-event",AuthMiddleware,OrganizerAuth,upload.fields([{name:"coverimage",maxCount:1},{name:"artistimage",maxCount:2}]),CreateEvent)
router.get("/all",AuthMiddleware,OrganizerAuth,getOrganizerAllevents)
router.get("/search",GetAllEvents)
router.get("/details/:id",EachEventDetails)
router.put("/cancel/:id",AuthMiddleware,OrganizerAuth,CancelEvent)
router.delete("/delete/:id",AuthMiddleware,OrganizerAuth,DeleteEvent)


module.exports = router 

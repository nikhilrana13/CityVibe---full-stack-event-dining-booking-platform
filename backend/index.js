const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
const {configure} = require("./config/db.js")
const AuthRoute = require("./routes/authroutes.js")
const OrganizerRoute = require("./routes/organizerroutes.js")
const AdminRoute = require("./routes/adminroutes.js")
const EventRoute = require("./routes/eventroutes.js")
const diningRoute = require("./routes/diningroutes.js")
const searchRoute = require("./routes/searchroutes.js")
const HomeRoute = require("./routes/homeroutes.js")
const RestaurantBookingRoute = require("./routes/restaurantbookingroutes.js")
const EventBooking = require("./routes/eventbookingroutes.js")
const WebhookRoute = require("./routes/stripewebhookroute.js")

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()
// stripe webhook 
app.use("/api",WebhookRoute)

// middleware 
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))


// routes
app.use("/api/auth",AuthRoute)
app.use("/api/organizer",OrganizerRoute)
app.use("/api/admin",AdminRoute)
app.use("/api/event",EventRoute)
app.use("/api/dining",diningRoute)
app.use("/api",searchRoute)
app.use("/api",HomeRoute)
app.use("/api",RestaurantBookingRoute)
app.use("/api",EventBooking)

// connect to db  
configure()

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})







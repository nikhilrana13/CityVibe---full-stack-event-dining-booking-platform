const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
const {configure} = require("./config/db.js")
const AuthRoute = require("./routes/authroutes.js")
const OrganizerRoute = require("./routes/organizerroutes.js")
dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()


// middleware 
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))


// routes
app.use("/api/auth",AuthRoute)
app.use("/api/organizer",OrganizerRoute)


// connect to db  
configure()



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})







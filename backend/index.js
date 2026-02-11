import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { configure } from "./config/db.js"

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()


// middleware 
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))


// routes



// connect to db  
configure()



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})







const mongoose = require("mongoose")
const eventbookingSchema = new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId,ref:"User",required:true},
    event:{type:mongoose.Types.ObjectId,ref:"Event",required:true},
    tickets:[{
        ticket:{type:mongoose.Types.ObjectId,ref:"Ticket"},
        quantity:{type:Number,required:true},
    }],
    totalAmount:{type:Number,required:true},
    paymentStatus:{type:String,enum:["pending","paid","failed"],default:"pending"},
    bookingStatus: {type: String,enum: ["confirmed", "cancelled","pending"],default: "pending"},
    stripePaymentId:{type:String},
    totalSeats:{type:Number,required:true}
},{timestamps:true})

const Eventbooking = mongoose.model("Eventbooking",eventbookingSchema)
module.exports = Eventbooking
const mongoose = require("mongoose")
const restaurantbookingSchema = new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId,ref:"User",required:true},
    restaurant:{type:mongoose.Types.ObjectId,ref:"Restaurant",required:true},
    bookingdate:{type:Date,required:true},
    timeSlot:{type:String,required:true},
    numberofguests:{type:Number,required:true,},
    specialrequests:{type:String,default:""},
    reservationType: { type: String,enum:["free","paid"],default: "free"},
    bookingStatus: {type: String,enum: ["confirmed", "cancelled"],default: "confirmed"}
},{timestamps:true})

const Restaurantbooking = mongoose.model("Restaurantbooking",restaurantbookingSchema)
module.exports = Restaurantbooking 
const mongoose = require("mongoose");
const RestaurentSchema = new mongoose.Schema({
  organizer: { type: mongoose.Types.ObjectId, ref: "Organizer", required: true,unique:true},
  name: { type: String, required: true },
  description: { type: String, required:true },
  city: { type: String, required: true,trim:true,lowercase:true},
  location: { type: String, required: true },
  address: { type: String, required: true },
  contactnumbers:[{type:String,required:true}],
  cuisine: [{ type: String,lowercase:true}],
  averagePrice: { type: Number,required:true },
  openingTime: { type: String,required:true},
  closingTime: { type: String,required:true},
  images: [{type:String,required:true}],
  isActive: { type: Boolean, default: true },
  availablefacility:{type:[String],lowercase:true,default:[]},
  slotInterval: { type: Number, default: 15 }, // 15 min gap
  lunchStart: String, // "12:00"
  lunchEnd: String,   // "14:00"
  dinnerStart: String, // "18:00"
  dinnerEnd: String,    // "23:00"
},{timestamps:true});

const Restaurant = mongoose.model("Restaurant",RestaurentSchema)
module.exports = Restaurant 




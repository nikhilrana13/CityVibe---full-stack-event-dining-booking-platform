const mongoose = require("mongoose");
const RestaurentSchema = new mongoose.Schema({
  organizer: { type: mongoose.Types.ObjectId, ref: "Organizer", required: true,unique:true},
  name: { type: String, required: true },
  description: { type: String, default: "" },
  city: { type: String, required: true,trim:true,lowercase:true},
  location: { type: String, required: true },
  address: { type: String, required: true },
  contactnumbers:[{type:String}],
  cuisine: [{ type: String }],
  averagePrice: { type: Number,default:0 },
  openingTime: { type: String,required:true},
  closingTime: { type: String,required:true},
  images: [{type:String}],
  isActive: { type: Boolean, default: true },
  availablefacility:{type:[String],default:[]}
},{timestamps:true});

const Restaurant = mongoose.model("Restaurant",RestaurentSchema)
module.exports = Restaurant 




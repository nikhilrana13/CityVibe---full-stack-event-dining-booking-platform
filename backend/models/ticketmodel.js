const mongoose = require("mongoose")
const TicketSchema = new mongoose.Schema({
  event:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Event",
    required:true
  },
  name:{ 
    type:String, 
    required:true 
  },

  price:{ 
    type:Number, 
    required:true 
  },

  totalQuantity:{ 
    type:Number, 
    required:true 
  },

  availableQuantity:{ 
    type:Number, 
    required:true 
  },

  perPerson:{
    type:Boolean,
    default:true
  },

  paxCount:{ 
    type:Number,
    default:1   // couple = 2, group of 4 = 4
  },
  description:{
    type:String,
    default:""
  }
},{timestamps:true})

const Ticket = mongoose.model("Ticket",TicketSchema)
module.exports = Ticket
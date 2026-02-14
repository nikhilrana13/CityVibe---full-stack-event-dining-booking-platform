const mongoose = require("mongoose")

const EventSchema = new mongoose.Schema({
    organizer:{type:mongoose.Schema.Types.ObjectId,ref:"Organizer",required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,enum:["music","comedy","sports","performances","fooddrinks","socialmixers","pets","openmics","celebrations"],required:true,lowercase:true,trim:true},
    startDate:{type:Date,required:true},
    endDate:{type:Date,default:null},
    starttime:{type:String,required:true},
    city:{type:String,required:true,trim:true,lowercase:true},
    location:{type:String,required:true},
    venue:{type:String,required:true},
    coverimage:{type:String,default:null},
    language:{type:String,default:""},
    duration:{type:String,default:""},
    ticketsneededfor:{type:String,default:"all ages"},
    eventIsActive:{type:Boolean,default:true},
    totalSeats:{type:Number,required:true},
    availableSeats:{type:Number,required:true},
    artists:[{
        name:{type:String,required:true},
        artistimage:{type:String,required:true},
        bio:{ type:String, default:"" }
    }]
},{timestamps:true})

// index for query performance
EventSchema.index({ city: 1 })
EventSchema.index({ category: 1 })
EventSchema.index({ startDate: 1 })

EventSchema.pre("save", function(next){
   if(this.endDate && this.endDate < this.startDate){
      return next(new Error("End date cannot be before start date"))
   }
})
const Event = mongoose.model("Event",EventSchema)
module.exports = Event
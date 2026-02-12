const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
  provider:{type:String,enum:["phone","google","manual"],required:function(){
    return this.role !== "admin"
  }},
  phonenumber:{type:String,required:function(){
      return this.provider === "phone"
    }
  },
  email:{ type:String,lowercase:true,trim:true,required:function(){
      return this.provider === "google"
    }
  },
  password: {type: String,required: function () {return this.role === "admin";}},
  name:{type:String,default:""},
  uid:{type:String,required:true,required:function(){
    return this.role !== "admin"
  }},
  role:{type:String,default:"user",enum:["user","admin"]},
  profilepic:{type:String,default:null},
  dob:{type:String,default:null},
  isVerified:{type:Boolean,default:false},
  gender:{type:String,default:null,enum:["male","female","other"]},
  hasOrganizerAccount:{type:Boolean,default:false,}
},{timestamps:true})

const User = mongoose.model("User",userschema)
module.exports = User

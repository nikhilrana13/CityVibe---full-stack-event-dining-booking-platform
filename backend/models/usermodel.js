const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
  provider:{type:String,enum:["phone","google"],required:true},
  phonenumber:{type:String,unique:true,sparse:true, required:function(){
      return this.provider === "phone"
    }
  },
  email:{ type:String, unique:true,lowercase:true,trim:true,required:function(){
      return this.provider === "google"
    }
  },
  name:{type:String,default:""},
  uid:{type:String,required:true},
  role:{type:String,default:"user",enum:["user","admin"]},
  profilepic:{type:String,default:null},
  dob:{type:String,default:null},
  isVerified:{type:Boolean,default:false},
  gender:{type:String,default:null,enum:["male","female","other"]}
},{timestamps:true})

const User = mongoose.model("User",userschema)
module.exports = User

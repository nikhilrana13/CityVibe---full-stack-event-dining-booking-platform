const Organizer = require("../models/organizermodel.js");
const Response = require("../utils/responsehandler.js");

const OrganizerAuth = async (req,res,next)=>{
   const userId = req.user

   const organizer = await Organizer.findOne({
      user: userId,
      verificationStatus: "approved"
   });

   if(!organizer){
      return Response(res,403,"Only approved organizers can access this dashboard and route")
   }

   next();
}

module.exports = OrganizerAuth
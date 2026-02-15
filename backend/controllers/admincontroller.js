const Organizer = require("../models/organizermodel.js")
const User = require("../models/usermodel.js")
const Response = require("../utils/responsehandler.js")



const GetOrganizers = async(req,res)=>{
    try {
         const adminId = req.user
         let {page = 1,limit = 5,status} = req.query 
         page = parseInt(page)
         limit = parseInt(limit)
        const skip = (page - 1) * limit
        // allowed status 
        const allowedStatus = ["pending","approved","rejected"]
        if(status && !allowedStatus.includes(status)){
            return Response(res,400,"Invalid status value")
        }
        let query = {}
        if(status){
            query.verificationStatus = status
        }
        const admin = await User.findById(adminId)
        if(!admin){
            return Response(res,404,"Admin not found")
        }
        if(admin.role !== "admin"){
            return Response(res,403,"Access denied Admin only")
        }
        const organizers = await Organizer.find(query).sort({createdAt:1}).skip(skip).limit(limit).populate("user","name email")
        const totalorganizers = await Organizer.countDocuments(query)
        const totalPages = Math.ceil(totalorganizers / limit)
        if(organizers.length === 0 ){
            return Response(res,200,"No Organizers found",[])
        } 
        return Response(res,200,"Organizers found",{organizers,pagination:{
            totalPages,
            currentPage:page,
            limit:limit,
            totalorganizers
        }})
    } catch (error) {
        console.log("failed to get organizers",error)
        return Response(res,500,"Internal server error")
    }
}

const ApproveandRejectorganizer = async(req,res)=>{
    try {
      const adminId = req.user 
      const {organizerId,status} = req.body
      if(!organizerId || !status){
         return Response(res,400,"Organizer ID and status are required")
      }
       if(!["approved", "rejected"].includes(status)){
            return Response(res,400,"Status must be either 'approved' or 'rejected'")
        }
      const admin = await User.findById(adminId)
       if(!admin){
            return Response(res,404,"Admin not found")
       }
       if(admin.role !== "admin"){
            return Response(res,403,"Access denied Admin only")
       }
       const organizer = await Organizer.findById(organizerId)
       if(!organizer){
         return Response(res,404,"Organizer not found")
       }
       if(organizer.verificationStatus !== "pending"){
        return Response(res,400,"This organizer has already been processed")
       }
      // handle status approvel 
      if(status === "approved"){
        organizer.verificationStatus = "approved"
        organizer.isVerified = true 
        organizer.isApproved = true
        await organizer.save()
      }   
      if(status === "rejected"){
        organizer.verificationStatus = "rejected"
        organizer.isVerified = false
        organizer.isApproved = false
        await organizer.save()
      }
      const updatedStatus = status
      return Response(res,200,`Organizer ${status} successfully`,{updatedStatus})
        
    } catch (error) {
        console.error("failed to approve or reject organizer",error)
        return Response(res,500,"Internal server error")
    }
} 




module.exports = {GetOrganizers,ApproveandRejectorganizer}
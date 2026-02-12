const Response = require("../utils/responsehandler.js");



const IsAdmin = async(req,res,next)=>{
    if (req.role !== "admin") {
    return Response(res, 403, "Access denied: Admin only");
  }
  next();
}

module.exports = IsAdmin
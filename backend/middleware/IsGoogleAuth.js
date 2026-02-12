const admin = require("../config/firebase.js")
const Response = require("../utils/responsehandler.js")



const IsgoogleAuth = async(req,res,next) => {
    try {
         const authHeader = req.headers.authorization
         if(!authHeader || !authHeader.startsWith("Bearer ")){
            return Response(res,401,"Unauthorized or invalid token")
         }
         const token = authHeader.split(" ")[1]

         const decoded = await admin.auth().verifyIdToken(token)
         req.user = decoded
         next()
    } catch (error) {
      console.log("error in isGoogleAuth middleware",error)
      return Response(res,500,"Internal server error")
    }
}

module.exports = IsgoogleAuth
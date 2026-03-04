const rateLimit = require("express-rate-limit")



// global limiter
const limiter = rateLimit({
    windowMs:15 * 60 * 1000, // 15 minutes
    max:1000, // 100 requests per ip
    standardHeaders: true,
    legacyHeaders: false,
    message: {
    status: "error",
    message: "Too many requests, please try again later."
  }
})
// auth limiter
const AuthLimiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 10, // only 5 login attempts
    standardHeaders: true,
    legacyHeaders: false,
    message: {
    status: "error",
    message: "Too many requests, please try again later."
    }
});
// booking limiter
const BookingLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
    status: "error",
    message: "Too many requests, please try again later."
    }
}); 

module.exports = {limiter,AuthLimiter,BookingLimiter}








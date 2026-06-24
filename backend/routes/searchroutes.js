const express = require("express")
const { Search } = require("../controllers/searchcontroller.js");
const redisClient = require("../config/redis.js");
const router = express.Router() 

// common search api
router.get("/search",Search)

module.exports = router
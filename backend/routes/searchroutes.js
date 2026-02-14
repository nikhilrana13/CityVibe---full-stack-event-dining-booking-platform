const express = require("express")
const { Search } = require("../controllers/searchcontroller.js")
const router = express.Router() 

// common search api
router.get("/search",Search)




module.exports = router
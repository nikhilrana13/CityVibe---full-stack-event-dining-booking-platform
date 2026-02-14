const express = require("express")
const { Home } = require("../controllers/homeController")
const router = express.Router()


// homepage data
router.get("/home",Home)

module.exports = router 
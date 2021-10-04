const express = require('express')
const router = express.Router()
const homeController = require('./../controllers/home')

console.log("home route")
router.get('/',homeController.home)
module.exports = router
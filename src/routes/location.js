const express = require('express')
const locationSchema = require('../models/location')
const router = express.Router()

// Test endpoint
router.get("/ping", (req,res) => {
    res.send("pong")
})

// Get close profiles
router.post("/getProfiles", (req, res) => {
    
})
const items = JSON.parse(req.body)
let user = items[0].username
module.exports = router
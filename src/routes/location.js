const express = require('express')
const User = require('../models/user')

const router = express.Router()

// Global variables
const radius = 10

// Test endpoint
router.get("/LocationPing", (_req,res) => {
    res.send("pong")
})

//Updates the location of a user
router.post("/updateLocation", async (req, res) => {
    try {
        let { username, longitude, latitude } = req.body
        let user = await User.findOne({'username': username})
        user.location = {
            type: 'Point', 
            coordinates: [longitude, latitude]
        }
        await user.save()
        res.status(200)
        res.json({ message: 'Location registered successfully!' })
    }
    catch (error) {
        console.log('[!] Error updating the location: ' + error)
        res.status(500)
        res.json({ error: '500. Internal Server Error' })
    }
})

// Get close profiles
router.post("/getNearUsers", async (req, res) => {
    try {
        let { username, longitude, latitude } = req.body
        let nearUsers = await User.findNearUsers(longitude, latitude, radius, username)
        console.log(nearUsers)
        res.status(200)
        res.send("AYIYIYIYYUYI")
    }
    catch (error) {
        console.log('[!] Error getting near users profiles: ' + error)
        res.status(500)
        res.json({ error: '500. Internal Server Error' })
    }
})

module.exports = router
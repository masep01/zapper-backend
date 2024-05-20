const express = require('express')
const User = require('../models/user')

const router = express.Router()

// Global variables
const radius = 100.0

// Test endpoint
router.get("/LocationPing", (_req,res) => {
    res.send("pong")
})

// Endpoint to update the location of a user
router.post("/updateLocation", async (req, res) => {
    try {
        let { username, longitude, latitude } = req.body
        let user = await User.findOne({'username': username})
        if (!user.location) {
            user.location = {
                type: 'Point', 
                coordinates: [longitude, latitude]
            }
        }
        else {
            user.location.coordinates = [longitude, latitude]
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

// Endpoint to get near user profiles 
router.post("/getNearUsers", async (req, res) => {
    try {
        let username = req.body.username
        let users = await User.findNearUsers(username, radius)
        res.status(200)
        res.json({nearUsers: users})
    }
    catch (error) {
        console.log('[!] Error getting near users profiles: ' + error)
        res.status(500)
        res.json({error: '500. Internal Server Error'})
    }
})

module.exports = router
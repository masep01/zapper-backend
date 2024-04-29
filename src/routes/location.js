const express = require('express')
const Location = require('../models/location')
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
        let user = await User.idByName(username)
        let location = await Location.findOne({ user: user._id })
        if (location) {
           location.location = {
                type: 'Point', 
                coordinates: [longitude, latitude]
           }
        }
        else {
            location = new Location ({
                user: user._id, 
                location: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                }
            })
        }
        await location.save()
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
        let username = req.body.username
        let user = await User.idByName(username)
        let userLoc = await Location.userLocation(user._id)
        let longitude = userLoc.location.coordinates[0]
        let latitude = userLoc.location.coordinates[1]
        console.log(longitude, latitude)
        let nearUsers = await Location.findNearUsers(longitude, latitude, radius, user._id)
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
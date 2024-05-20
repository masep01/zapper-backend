const express = require('express')
const User = require('../models/user')

const router = express.Router()

module.exports = router

router.get("/ProfilesPing", (_req, res) => {
    res.send("pong")
})

//Endopoint to update user profile information
router.post("/updateUserInfo", async (req, res) => {
    try {
        let { username, instagram, twitter, email } = req.body
        let user = await User.findOne({'username': username})
        if (!user.profiles) {
            user.profiles = {
                instagram: instagram,
                twitter: twitter
            }
        }
        else {
            user.profiles.instagram = instagram
            user.profiles.twitter = twitter
        }
        user.email = email
        await user.save()
        res.status(200)
        res.json({message: 'User info successfully updated!'})
    }
    catch(error) {
        console.log('[!]Error uploading the user profile info ' + error)
        res.status(500)
        res.json({message: 'Error 500. Internal Server Error'})
    }
})

//Enpoint to get user information
router.post('/getUserInfo', async (req, res) => {
    try{
        let username = req.body.username
        let info = await User.findOne({'username': username}).select({
            'username': 1,
            'email': 1,  
            'age': 1,
            'profiles': 1, 
            '_id': 0
        })
        res.status(200)
        res.json({userInfo: info})
    } 
    catch (error) {
        console.log('[!]Error getting user information ' + error)
        res.status(500)
        res.json({error: 'Error 500. Internal Server Error'})
    }
})
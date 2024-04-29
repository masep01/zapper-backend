const express = require('express')
const User = require('../models/user')
const router = express.Router()

// Test endpoint
router.get("/pingUser", (req,res) => {
    res.send("pong")
})

// Enpoint to register a new user
router.post("/register", async (req, res) =>{
    try {
        let { username, email, password, age } = req.body
        let user = new User ({
            username: username,
            password: password,
            email: email, 
            age: age
        })
        await user.save()
        res.status(200)
        res.json( {'message': 'User registered successfully!'})
    }
    catch (error) {
        console.log('[!]Error in new user register: ' + error)
        res.status(500)
        res.json( {'error': 'Error 500. Internal Server Error'} )
    }
})

module.exports = router
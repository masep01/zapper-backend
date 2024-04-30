const express = require('express')
const User = require('../models/user')
const router = express.Router()

// Test endpoint
router.get("/pingUser", (req,res) => {
    res.send("pong")
})

// Endpoint to register a new user
router.post("/register", async (req, res) => {
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

// Endpoint to login with an existing user 
router.post("/login", async (req, res) => {
    try { 
        let { username, password } = req.body 
        let user = await User.findOne({'username':username, 'password':password })
        if (user) {
            res.status(200)
            res.json( {'message': 'Login successfull!'} )
        }
        else {
            res.status(401)
            res.json({'error': 'Error 401. Unauthorized'})
        }  
    }
    catch (error) {
        console.log('[!] Error in the login process: ' + error)
        res.status(500)
        res.json({'error': 'Error 500. Internal Server Error'})
    }
})

module.exports = router
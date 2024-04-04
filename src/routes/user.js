const express = require('express')
const userSchema = require('../models/user')
const router = express.Router()

// Test endpoint
router.get("/ping", (req,res) => {
    res.send("pong")
})

// Create new User
router.post("/newUser", (req, res) => {
    const user = userSchema(req.body)
    user
        .save()
        .then((data) => {
            res.json(data)
            console.log('[$] User created: ' + req.body)
        })
        .catch((error) => {
            res.json({ message: error })
            console.log('[!] Error creating user: ' + error)
        })  
})

// Get users
router.get("/users", (req,res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

router.get("/user/:id", (req,res) => {
    const { id } = req.params;
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

// Delete user
router.get("/deleteUser/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .deleteOne({ _id: id })
        .then((data) => {
            res.json(data)
            console.log('[$] User deleted: ' + id)
        })
        .catch((error) => {
            res.json({ message: error })
            console.log('[!] Error deleting user: ' + error)
        })  
})

module.exports = router
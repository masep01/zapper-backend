const express = require('express')
const router = express.Router()

// Create new User
router.get("/user", (req, res) => {
    res.send("New user created!")
})

module.exports = router
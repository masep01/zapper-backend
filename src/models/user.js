const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date, 
        default: () => Date.now(),
        immutable: true,  
    }
})

module.exports = mongoose.model('User', userSchema)
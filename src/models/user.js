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
    email: {
        type: String, 
        required: true
    }, 
    createdAt: {
        type: Date, 
        default: () => Date.now(),
        immutable: true,  
    },
})

//Function to get the MongoDB ID of the user with username = name
userSchema.statics.idByName = function(name) {
    return this.findOne({ username: name }).select('_id')
}

module.exports = mongoose.model('User', userSchema)
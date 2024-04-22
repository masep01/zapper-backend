const mongoose = require('mongoose')
const User = require('./user')

const locationSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: User,
    }, 
    longitude: {
        type: Number, 
        required: true, 
    },
    latitude: {
        type: Number, 
        required: true, 
    },
})

module.exports = mongoose.model('Location', locationSchema)
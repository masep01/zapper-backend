const mongoose = require('mongoose')
const User = require('./user')

const locationSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: User
    }, 
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
})

//2dsphere index on location field to enable MongoDB 
//Efficiently perform geospatial queries
locationSchema.index({ location: '2dsphere' })

//Function to find near users given a geographical point and a radius
//The user identified with userId is excluded from the result
locationSchema.statics.findNearUsers = function (longitude, latitude, radiusInMeters, userId) {
    const radiusInRadians = radiusInMeters / 6371000 // Radius in meters / Earth Radius
    return this.find({
        location: {
            $nearSphere: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                },
                $maxDistance: radiusInRadians
            }    
        },
        user: { $ne: userId }
    }).select( {'user': 1, '_id': 0} )
}

//Function to get the location given a userId
locationSchema.statics.userLocation = function (userId) {
    return this.findOne({ user: userId }).select( {'location.coordinates': 1, '_id': 0})
}
module.exports = mongoose.model('Location', locationSchema)
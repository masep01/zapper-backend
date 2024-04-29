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
    age: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date, 
        default: () => Date.now(),
        immutable: true,  
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number], 
        }
    },
    profiles: {
        twitter: String, 
        instagram: String
    }
})

//2dsphere index on location field to enable MongoDB 
//Efficiently perform geospatial queries
userSchema.index({ location: '2dsphere' })

//Function to get the MongoDB ID of the user with username = name
userSchema.statics.idByName = function(name) {
    return this.findOne({ username: name }).select('_id')
}

//Function to find near users given a geographical point and a radius
//The user that invokes the method is excluded from the result
userSchema.statics.findNearUsers = function (radiusInMeters, username) {
    if (this.location) {
        const radiusInRadians = radiusInMeters / 6371000 // Radius in meters / Earth Radius
        let longitude = this.location.coordinates.longitude
        let latitude = this.location.coordinates.latitude
        
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
            username: { $ne: username }
        }).select( {'username': 1, '_id': 0} )
    }
    else return [] 
}

//Function to get the location of a user given his username
userSchema.statics.userLocation = function (username) {
    return this.findOne({ user: username }).select( {'location.coordinates': 1, '_id': 0})
}

module.exports = mongoose.model('User', userSchema)
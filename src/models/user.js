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
userSchema.index({location: '2dsphere'})

//Function to get the MongoDB ID of the user with username = name
userSchema.statics.idByName = function(name) {
    return this.findOne({ username: name }).select('_id')
}

userSchema.statics.findNearUsers = async function(username, radiusInMeters) {
    let user = await this.findOne({'username': username})
    if (user.location) {
        const { coordinates } = user.location
        return await this.find({
            location: {
                $nearSphere: {
                    $geometry: {
                        type: 'Point',
                        coordinates: coordinates
                    },
                    $maxDistance: radiusInMeters
                }
            },
            username: { $ne: username }
        }).select({ 'username': 1, 'location': 1,
        'age': 1, 'profiles': 1, '_id': 0 })
    }
    else return []
}

//Function to get the location of a user given his username
userSchema.statics.userLocation = function (username) {
    return this.findOne({ user: username }).select( {'location.coordinates': 1, '_id': 0})
}

module.exports = mongoose.model('User', userSchema)
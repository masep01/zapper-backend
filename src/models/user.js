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

//Function to find near users to the user identified by username
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

module.exports = mongoose.model('User', userSchema)
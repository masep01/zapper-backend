# USER LOCATION

The content of this document includes all the steps done in our project related with server-side user location management. 

## MONGOOSE SCHEMA

The first step is to create a mongoose schema that defines the contents to be stored inside the MongoDB database.

```js 
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
```

Location collection stored in the database will have the fields declared above:

+ **user:** It will reference to the ObjectId of the user which location is being registered. 

+ **longitude:** The coordinate of users current longitude . 

+ **latitude:** The coordinate of users current latitude. 

## API ENDPOINTS


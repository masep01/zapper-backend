# USER LOCATION

## USER SCHEMA

```js
location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number], 
        }
    },
```
Inside the user schema is defined the **location** attribute. This is a complex JSON element that has two nested values:

 - **type**, a String that must be equivalent to ***'Point'***. 

 - **coordinates**, a number array, which has only two elements: ***longitude*** in the first position, and ***latitude*** in the last one. 

```js
userSchema.index({location: '2dsphere'})
```
In order to perform geospatial queries on an earth-like sphere, a  **2dsphere index** must be created on our location field. To do it, the previous line needs to be present in the model definition. Stored data related with location will be converted to **GeoJSON points**, the required type, by MongoDB.

The **2dsphere index** allows our application to: 

+ Determine points within a specified area.

+ Calculate proximity to a specified point.

+ Return exact matches on coordinate queries.

These are the operations needed to discover near users given a radius.

Finally, we declare a static function for all the instances of the model. This method will obtain all users within a circumference, which center is defined by the location point. 






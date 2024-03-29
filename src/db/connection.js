const mongoose = require('mongoose')
const connString = process.env.ATLAS_URI || ""

// Connection with MongoDB
mongoose
    .connect(connString)
    .then(() => console.log("[*] Connected to MongoDB Atlas successfully."))
    .catch((error) => console.error("[!] "+error))


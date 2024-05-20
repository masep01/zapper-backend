const mongoose = require('mongoose')
const connString = process.env.MONGODB_URI || ""

// Connection with MongoDB
mongoose
    .connect(connString)
    .then(() => console.log("[*] Connected to MongoDB successfully."))
    .catch((error) => console.error("[!] "+error))


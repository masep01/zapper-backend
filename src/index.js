const express = require('express')
require('dotenv').config();
require('./db/connection.js')
const userRoutes = require('./routes/user.js')

const app = express()
const port = process.env.PORT

// Test path
app.get('/', (req, res) => {
  res.send('Zapper PATH:  /')
})

app.use('/api', userRoutes)

app.listen(port, () => {
  console.log(`[*] Zapper HTTP Server listening at http://localhost:${port}`)
})

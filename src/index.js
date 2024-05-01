const express = require('express')
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize')
require('dotenv').config();
require('./db/connection.js')
const userRoutes = require('./routes/user.js')
const locationRoutes = require('./routes/location.js')
const profileRoutes = require('./routes/profiles.js')

const app = express()
const port = process.env.PORT

// Middlewares
app.use(
  morgan("[#] :method :url :status :res[content-length] - :response-time ms")
)
app.use(mongoSanitize())
app.use(express.json())

app.use('/api', userRoutes)
app.use('/api', locationRoutes)
app.use('/api', profileRoutes)

// Test path
app.get('/', (_req, res) => {
  res.send('Zapper PATH:  /')
})

app.listen(port, () => {
  console.log(`[*] Zapper HTTP Server listening at http://localhost:${port}`)
})  
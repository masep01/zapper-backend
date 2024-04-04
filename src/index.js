const express = require('express')
var morgan = require('morgan')
require('dotenv').config();
require('./db/connection.js')
const userRoutes = require('./routes/user.js')

const app = express()
const port = process.env.PORT

// Middleware
app.use(
  morgan("[#] :method :url :status :res[content-length] - :response-time ms")
)
app.use(express.json())
app.use('/api', userRoutes)

// Test path
app.get('/', (req, res) => {
  res.send('Zapper PATH:  /')
})

app.listen(port, () => {
  console.log(`[*] Zapper HTTP Server listening at http://localhost:${port}`)
})  
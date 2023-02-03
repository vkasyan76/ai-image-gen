const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

// This error is due to CORS (Cross-Origin Resource Sharing) policy restrictions. The browser is blocking your request to the API endpoint because the origin (http://localhost:3000) is different from the API's origin (http://localhost:5000).
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
})

// Enable body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Set a static folder
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'client/build')))

// Parcer for testing in the browser with index.html / alternative to postman
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/openai', require('./routes/openaiRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`))

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

// Enable body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')))

// Parcer for testing in the browser with index.html / alternative to postman
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/openai', require('./routes/openaiRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`))
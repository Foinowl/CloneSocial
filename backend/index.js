const express = require('express')

const config = require('./config/app')

const app = express()

const port = config.appRoot

app.listen(port, () => {
  console.log(`Server listening in the port: ${port}}`)
})
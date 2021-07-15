const express = require("express")
const config = require("./config/app")
const router = require("./router")
const cookieParser = require("cookie-parser")
// const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()


// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
app.use(router)
app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/uploads"))

const port = config.appPort

app.listen(port, () => {
  console.log(`Server listening in the port: ${port}`)
})

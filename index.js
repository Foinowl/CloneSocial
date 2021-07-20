const express = require("express")
const config = require("./config/app")
const router = require("./router")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()
const path = require("path")
const http = require("http")


app.use(express.static(path.join(__dirname, "client/build")))

if (process.env.NODE_ENV === "production") {
	//server static content
	//npm run build
	app.use(express.static(path.join(__dirname, "client/build")))
}


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
app.use(router)
app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/uploads"))

const PORT = config.appPort



// const server = http.createServer(app)
var server = app.listen(PORT, () => {
	console.log(`Server listening in the port: ${PORT}`)
})

const SocketServer = require("./socket")
SocketServer(server)


// app.listen(port, () => {
//   console.log(`Server listening in the port: ${port}`)
// })

const router = require("express").Router()




router.use("/", require("./auth"))
router.use("/chats", require("./chat"))
router.use("/users", require("./user"))

// router.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "client/build/index.html"))
// })


module.exports = router
const router = require("express").Router()


router.use("/", require("./auth"))
router.use("/chats", require("./chat"))
router.use("/users", require("./user"))


module.exports = router
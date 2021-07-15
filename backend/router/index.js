const router = require("express").Router()


router.use("/", require("./auth"))
router.use("/chats", require("./chat"))


module.exports = router
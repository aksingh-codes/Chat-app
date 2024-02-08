const express = require("express");
const {
  allMessages, sendMessage,
} = require("../controller/message");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.route("/:chatId").get(authenticateToken, allMessages);
router.route("/").post(authenticateToken, sendMessage);

module.exports = router;
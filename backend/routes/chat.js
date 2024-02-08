const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const { createGroupChat, allChats, accessChat } = require("../controller/chat");

const router = express.Router();

router
  .route("/")
  .get(authenticateToken, allChats)
  .post(authenticateToken, accessChat);
router.route("/group").post(authenticateToken, createGroupChat);

module.exports = router;

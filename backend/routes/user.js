const express = require("express");
const { loginUser, registerUser, allUsers } = require("../controller/user");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(authenticateToken, allUsers)
router.route("/register").post(registerUser);
router.post("/login", loginUser);

module.exports = router;

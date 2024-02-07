const jwt = require("jsonwebtoken");
const User = require("../models/users");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!!!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({
        error: JSON.stringify(err),
      });
    }

    const users = await User.find().lean();

    const foundUser = users.find((u) => u.email === decoded.email);
    if (foundUser) {
      delete foundUser.password;

      req.user = foundUser;
    } else {
      return res.sendStatus(401);
    }

    next();
  });
};

module.exports = { authenticateToken };

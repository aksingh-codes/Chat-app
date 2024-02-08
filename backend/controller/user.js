const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const allUsers = async (req, res, next) => {
  try {
    const users = await User.find().lean();
    users.forEach((user) => {
      delete user.password;
    });
    res.status(200).json({
      message: "Users fetched successfully",
      data: { users },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get users",
      error: JSON.stringify(error),
    });
  }
};

const registerUser = async (req, res, next) => {
  try {
    const user = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newUser = new User({ ...user, password: hashedPassword });
    await newUser.save();
    res.status(200).json({
      message: "User added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add user",
      error: JSON.stringify(error),
    });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = req.body;

    const users = await User.find().lean();
    const foundUser = users.find((u) => u.email === user.email);

    if (!!!foundUser) {
      return res.status(400).json({ message: "User not found" });
    }

    if (await bcrypt.compare(user.password, foundUser.password)) {
      delete foundUser.password;

      const accessToken = jwt.sign(
        JSON.stringify(foundUser),
        process.env.JWT_TOKEN_SECRET
      );
      res.status(200).json({
        message: "User logged in successfully",
        data: {
          accessToken: accessToken,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid password" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to login", error: JSON.stringify(error) });
  }
};

module.exports = {
  allUsers,
  registerUser,
  loginUser,
};

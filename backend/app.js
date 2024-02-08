const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");

const Chat = require("./models/chats");

const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("✅: Connected to database");
    main();
  })
  .catch(() => {
    console.log("❌: Failed to conect to database");
  });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

function main() {
  io.on("connection", async (socket) => {
    console.log("A client connected...");

    const chats = await Chat.find({});
    socket.emit("initialize", { chats });

    socket.on("chat", async (payload) => {
      console.log("What is payload", payload);

      const chat = new Chat({ message: payload.message });
      await chat.save();

      io.emit("chat", chat);
    });
  });
}

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to server ",
  });
});

server.listen(PORT, () => {
  console.log("Server running on:", PORT);
});

const express = require("express");
const http = require("http");
const mongoose = require("mongoose")

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const Chat = require("./models/chats")

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3001",
  },
});

mongoose.connect('mongodb://localhost:27017/chat-db').then(
  () => {
    console.log('✅: Connected to database')

    io.on("connection", async (socket) => {
      // console.log("What is socket:", socket);
      console.log("A client connected...");

      const chats = await Chat.find({})
      socket.emit("initialize", {chats})
    
      socket.on("chat", async (payload) => {
        console.log("What is payload", payload)

        const chat = new Chat({message: payload.message})
        await chat.save()

        socket.emit("chat", chat)
      })
    });

  }
).catch(
  () => {
    console.log('❌: Failed to conect to database')
  }
)

server.listen(PORT, () => {
  console.log("Server running on:", PORT);
});

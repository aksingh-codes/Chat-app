const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema({
  message: String, // String is shorthand for {type: String}
  date: { type: Date, default: Date.now },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

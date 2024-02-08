const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, trim: true, required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;

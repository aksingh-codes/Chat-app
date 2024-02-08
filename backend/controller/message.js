const Message = require("../models/messages");

const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "-password")

    res.json(messages);
  } catch (error) {
    res.status(400);
  }
};

const sendMessage = async (req, res) => {
  try {
    const sender = req.user._id;
    const { content, chat } = req.body;

    if (!!!content || !!!chat)
      return res.status(400).json({ message: "Content and chat are required" });

    const message = new Message({ content, chat, sender });
    await message.save();

    res.status(201).json({
      message: "Message sent",
      data: {
        message,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to send message",
      error: error,
    });
  }
};

module.exports = { allMessages, sendMessage };

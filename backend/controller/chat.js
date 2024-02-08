const Chat = require("../models/chats");
const User = require("../models/users");

const allChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({});

    res.status(200).json({
      data: { chats },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get users",
      error: JSON.stringify(error),
    });
  }
};

const accessChat = async (req, res, next) => {
  try {
    const user = req.user;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const foundChat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [user._id, userId], $size: 2 },
    });

    if (!!!foundChat) {
      const chat = new Chat({
        isGroupChat: false,
        users: [user._id, userId],
      });
      await chat.save();
      return res.status(201).json({
        message: "Chat created successfully",
        data: { chat },
      });
    } else {
      return res.status(200).json({
        message: "Chat found",
        data: { chat: foundChat },
      });
    }
  } catch {
    res.status(500).json({
      message: "Failed to access chat",
      error: JSON.stringify(error),
    });
  }
};

const createGroupChat = async (req, res, next) => {
  try {
    const { chatName, isGroupChat, users } = req.body;

    const userIds = await User.find({ _id: { $in: users } })
      .select("_id")
      .lean();
    userIds.push({ _id: req.user._id });

    if (isGroupChat && userIds.length < 2) {
      return res.status(400).json({
        message: "Group chat must have at least 2 users",
      });
    } else if (isGroupChat && !!!chatName) {
      return res.status(400).json({
        message: "Group chat must have a name",
      });
    } else if (!isGroupChat && userIds.length !== 2) {
      return res.status(400).json({
        message: "Private chat must have exactly 2 users",
      });
    }

    const chat = new Chat({
      chatName,
      isGroupChat,
      users: userIds,
      groupAdmin: isGroupChat ? req.user._id : undefined,
    });

    await chat.save();

    res.status(201).json({
      message: "Chat created successfully",
      data: { chat },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create chat",
      error: JSON.stringify(error),
    });
  }
};

module.exports = { allChats, accessChat, createGroupChat };

import Chat from "../model/chat.js";
import Message from "../model/message.js";
import User from "../model/user.js";
import { generateAdminToken } from "../utils/generateToken.js";

export const adminLogin = async (req, res) => {
  try {
    const { secretKey } = req.body;

    if (!secretKey) {
      return res
        .status(400)
        .json({ success: false, message: "Secret key is required" });
    }

    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid secret key" });
    }

    const token = generateAdminToken({ secretKey });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure flag in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 12 * 60 * 60 * 1000, // 12 hours in milliseconds
    });

    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const adminLogout = (req, res) => {
  try {
    res.clearCookie("access_token");
    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getAdminData = async (req, res) => {
  try {
    return res.status(200).json({ success: true, admin: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await User.find({});

    const transformedUsers = await Promise.all(
      users.map(async (user) => {
        const [groups, friends] = await Promise.all([
          Chat.countDocuments({ groupChat: true, members: user._id }),
          Chat.countDocuments({ groupChat: false, members: user._id }),
        ]);
        return {
          _id: user._id,
          name: user.name,
          username: user.username,
          avatar: user.avatar.url,
          groups,
          friends,
        };
      })
    );

    return res.status(200).json({ success: true, users: transformedUsers });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const allChats = async (req, res) => {
  try {
    const chats = await Chat.find({})
      .populate("members", "name avatar")
      .populate("creator", "name avatar");

    const transformedChats = await Promise.all(
      chats.map(async ({ _id, members, groupChat, name, creator }) => {
        const totalMessages = await Message.countDocuments({ chat: _id });
        return {
          _id,
          groupChat,
          name,
          avatar: members.slice(0, 3).map((member) => member.avatar.url),
          members: members.map((member) => {
            return {
              _id: member._id,
              name: member.name,
              avatar: member.avatar.url,
            };
          }),
          creator: {
            name: creator?.name || "none",
            avatar: creator?.avatar?.url || "",
          },
          totalMembers: members.length,
          totalMessages,
        };
      })
    );
    return res.status(200).json({ success: true, chats: transformedChats });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({})
      .populate("sender", "name avatar")
      .populate("chat", "groupChat");
    const transformedMessages = messages.map(
      ({ content, sender, chat, attachments, createdAt, _id }) => {
        return {
          _id,
          attachments,
          content,
          createdAt,
          chat,
          sender: {
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url,
          },
        };
      }
    );
    return res.status(200).json({
      status: true,
      messages: transformedMessages,
    });
  } catch (error) {
    console.log("erro", error);
    return res.status(500).json({
      status: false,
      message: "internal server error",
    });
  }
};

export const getDashBoardStats = async (req, res) => {
  try {
    const [groupsCount, usersCount, messagesCount, totalChatsCount] =
      await Promise.all([
        Chat.countDocuments({ groupChat: true }),
        User.countDocuments(),
        Message.countDocuments(),
        Chat.countDocuments(),
      ]);

    const today = new Date();
    const last7days = new Date();

    last7days.setDate(today.getDate() - 7);

    const last7daysMessages = await Message.find({
      createdAt: {
        $gte: last7days,
        $lte: today,
      },
    }).select("createdAt");

    const messages = new Array(7).fill(0);

    last7daysMessages.forEach((message) => {
      const indexApprox =
        (today.getTime() - message.createdAt.getTime()) / (1000 * 60 * 60 * 24);
      const index = Math.floor(indexApprox);
      messages[6 - index]++;
    });

    const stats = {
      groupsCount,
      usersCount,
      messagesCount,
      totalChatsCount,
      messages,
    };
    return res.status(200).json({
      status: true,
      stats,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      status: false,
      message: "internal server error",
    });
  }
};

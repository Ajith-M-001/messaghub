import User from "../model/user.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import Chat from "../model/chat.js";
import Request from "../model/request.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { emitEvent } from "../utils/emitEvent.js";
import { getOtherMember } from "../utils/helper.js";

export const newUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const avatar = req.file;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      password: hashedPassword,
      // avatar: {
      //   public_id: avatar?.filename,
      //   url: avatar?.path,
      // },
    });

    const savedUser = await user.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");
    console.log(user);

    if (!user) {
      return next(new Error("Invalid username or password"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    const token = generateToken({ userId: user._id });

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure flag in production
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 12 * 60 * 60 * 1000, // 12 hours in milliseconds
      })
      .json({ success: true, message: "Login successful" });
  } catch (error) {
    console.log(error);
  }
};

export const getMyProfile = async (req, res) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user.userId);
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("access_token")
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.log(error);
  }
};

export const searchUser = async (req, res) => {
  try {
    const { user = "" } = req.query;

    const myChats = await Chat.find({
      groupChat: false,
      members: req.user.userId,
    });

    //all users from my chats means friends or people i have chated with
    const allUsersFromMyChat = myChats.map((chat) => chat.members).flat(); // This gives you a flat array of members from all chats

    const allUsersExceptMeAndFriends = await User.find({
      _id: { $nin: allUsersFromMyChat },
      name: { $regex: user, $options: "i" },
    });

    const users = allUsersExceptMeAndFriends.map((user) => ({
      ...user._doc,
      avatar: user.avatar.url,
    }));
    res.status(200).json({
      success: true,
      message: "Search successful",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const request = await Request.findOne({
      $or: [
        { sender: req.user.userId, receiver: userId },
        { sender: userId, receiver: req.user.userId },
      ],
    });

    if (request) {
      return res
        .status(400)
        .json({ success: false, message: "Request already sent" });
    }

    await Request.create({
      sender: req.user.userId,
      receiver: userId,
    });

    emitEvent(req, NEW_REQUEST, [userId]);

    res
      .status(200)
      .json({ success: true, message: "Request sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId, accept } = req.body;

    if (!requestId || !accept) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const request = await Request.findById(requestId)
      .populate("sender", "name")
      .populate("receiver", "name");

    console.log(request);
    console.log(req.user.userId);

    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }

    if (request.receiver._id.toString() !== req.user.userId.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!accept) {
      await Request.findByIdAndDelete(requestId);
      return res
        .status(200)
        .json({ success: true, message: "Request rejected" });
    }

    const members = [request.sender._id, request.receiver._id];

    await Promise.all([
      Chat.create({
        members,
        groupChat: false,
        name: `${request.sender.name} - ${request.receiver.name}`,
      }),
      Request.findByIdAndDelete(requestId),
    ]);

    emitEvent(req, REFETCH_CHATS, members, null);

    res.status(200).json({
      success: true,
      message: "Request accepted",
      senderId: request.sender._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getMyNotifications = async (req, res) => {
  try {
    const requests = await Request.find({ receiver: req.user.userId })
      .populate("sender", "name avatar")
      .populate("receiver", "name avatar");

    const allRequest = requests.map((request) => {
      return {
        _id: request._id,
        sender: {
          _id: request.sender._id,
          name: request.sender.name,
          avatar: request.sender.avatar.url,
        },
      };
    });

    return res
      .status(200)
      .json({ success: true, message: "Notifications fetched", allRequest });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getMyFriends = async (req, res) => {
  try {
    const chatId = req.query.chatId;

    const chats = await Chat.find({
      members: req.user.userId,
      groupChat: false,
    }).populate("members", "name avatar");

    if (!chats) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }
    const friends = chats.map(({ members }) => {
      const otherUser = getOtherMember(members, req.user.userId);

      return {
        _id: otherUser._id,
        name: otherUser.name,
        avatar: otherUser.avatar.url,
      };
    });

    if (chatId) {
      const chat = await Chat.findById(chatId);
      const availableFriends = friends.filter(
        (friend) => !chat.members.includes(friend._id)
      );
      return res.status(200).json({
        success: true,
        message: "Friends fetched",
        friends: availableFriends,
      });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Friends fetched", friends });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

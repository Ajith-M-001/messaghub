import {
  ALERT,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/events.js";
import Chat from "../model/chat.js";
import { emitEvent } from "../utils/emitEvent.js";
import { getOtherMember } from "../utils/helper.js";
import User from "../model/user.js";
import Message from "../model/message.js";
import {
  deleteFilesFromCloudinary,
  uploadFilesToCloudinary,
} from "../utils/cloudinaary.js";
import Request from "../model/request.js";

export const newGroupChat = async (req, res) => {
  try {
    const { name, members } = req.body;
    if (!name || !members) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required 1" });
    }

    if (members.length < 2) {
      return res
        .status(400)
        .json({ success: false, message: "At least 2 members are required" });
    }

    const allmembers = [...members, req.user.userId];

    // Create the group chat in the database
    const newChat = await Chat.create({
      name,
      groupChat: true,
      creator: req.user.userId,
      members: allmembers,
    });

    emitEvent(req, ALERT, allmembers, `welcome to ${newChat.name} group`);
    emitEvent(req, REFETCH_CHATS, members, null);

    res.status(201).json({ success: true, message: "Group chat created" });
  } catch (error) {
    console.error(error);
  }
};

export const getMyChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      members: { $in: [req.user.userId] },
    }).populate("members", "name username avatar");

    const transformedChats = chats.map((chat) => {
      const otherMember = getOtherMember(chat.members, req.user.userId);

      return {
        _id: chat._id,
        groupChat: chat.groupChat,
        avatar: chat.groupChat
          ? chat.members.slice(0, 3).map(({ avatar }) => avatar.url)
          : [otherMember.avatar.url],
        name: chat.groupChat ? chat.name : otherMember.name,
        members: chat.members.reduce((prev, curr) => {
          if (curr._id.toString() !== req.user.userId.toString()) {
            prev.push(curr._id);
          }
          return prev;
        }, []),
      };
    });
    res.status(200).json({ success: true, transformedChats });
  } catch (error) {
    console.log(error);
  }
};

export const getMyGroup = async (req, res) => {
  try {
    const chats = await Chat.find({
      members: {
        $in: [req.user.userId],
      },
      groupChat: true,
      creator: req.user.userId,
    }).populate("members", "name username avatar");

    const groups = chats.map((chat) => {
      return {
        _id: chat._id,
        name: chat.name,
        groupChat: chat.groupChat,
        avatar: chat.members.slice(0, 3).map(({ avatar }) => avatar.url),
      };
    });
    res.status(200).json({ success: true, groups });
  } catch (error) {
    console.log(error);
  }
};
export const addMembers = async (req, res) => {
  try {
    const { chatId, members } = req.body;

    if (!chatId || !members) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required 2" });
    }

    if (members.length < 1) {
      return res
        .status(400)
        .json({ success: false, message: "At least 1 member is required" });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    if (!chat.groupChat) {
      return res
        .status(400)
        .json({ success: false, message: "This is not a group chat" });
    }

    if (chat.creator.toString() !== req.user.userId.toString()) {
      return res
        .status(400)
        .json({ success: false, message: "Only creator can add members" });
    }

    const allNewMembersPromise = members.map((member) =>
      User.findById(member, "name")
    );

    const allNewMembers = await Promise.all(allNewMembersPromise);

    const uniqueMembers = allNewMembers
      .filter((member) => !chat.members.includes(member._id.toString()))
      .map((member) => member._id);

    if (uniqueMembers.length < 1) {
      return res.status(400).json({
        success: false,
        message: "members are already in the group",
      });
    }

    chat.members.push(...uniqueMembers.map((member) => member._id));

    if (chat.members.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Group chat can't have more than 100 members",
      });
    }

    await chat.save();

    const allUserName = allNewMembers.map((member) => member.name).join(", ");

    emitEvent(req, ALERT, chat.members, `${allUserName} joined the group`);
    emitEvent(req, REFETCH_CHATS, chat.members, null);

    res.status(200).json({ success: true, message: "Members added" });
  } catch (error) {
    console.log(error);
  }
};

export const removeMembers = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    if (!chatId || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required 3" });
    }

    const [chat, userThatWillBeRemoved] = await Promise.all([
      Chat.findById(chatId),
      User.findById(userId, "name"),
    ]);

    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    if (!chat.groupChat) {
      return res
        .status(400)
        .json({ success: false, message: "This is not a group chat" });
    }

    if (!userThatWillBeRemoved) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (chat.creator.toString() !== req.user.userId.toString()) {
      return res
        .status(400)
        .json({ success: false, message: "Only creator can remove members" });
    }

    if (chat.members.length <= 3) {
      return res.status(400).json({
        success: false,
        message: "Group chat can't have less than 3 members",
      });
    }

    const allmembers = chat.members.map((member) => member.toString());

    chat.members = chat.members.filter(
      (member) => member.toString() !== userId.toString()
    );

    await chat.save();

    emitEvent(req, ALERT, chat.members, {
      message: `${userThatWillBeRemoved.name} removed from the group`,
      chatId,
    });
    emitEvent(req, REFETCH_CHATS, allmembers, null);

    res.status(200).json({ success: true, message: "Members removed" });
  } catch (error) {
    console.log(error);
  }
};

export const leaveGroup = async (req, res) => {
  try {
    const chatId = req.params.id;

    if (!chatId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required 4" });
    }

    const chat = await Chat.findById(chatId);

    //you are not a member of this group

    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    if (!chat.groupChat) {
      return res
        .status(400)
        .json({ success: false, message: "This is not a group chat" });
    }

    if (chat.members.length <= 3) {
      return res.status(400).json({
        success: false,
        message: "Group chat can't have less than 3 members",
      });
    }

    const remaningMembers = chat.members.filter(
      (member) => member.toString() !== req.user.userId.toString()
    );

    if (chat.creator.toString() === req.user.userId.toString()) {
      const newCreator = remaningMembers[0];
      chat.creator = newCreator;
    }

    chat.members = remaningMembers;

    const [user] = await Promise.all([
      User.findById(req.user.userId, "name"),
      chat.save(),
    ]);

    emitEvent(req, ALERT, chat.members, {
      message: `${user.name} left the group`,
      chatId,
    });

    res.status(200).json({ success: true, message: "Left the group" });
  } catch (error) {
    console.log(error);
  }
};

export const sendAttachments = async (req, res) => {
  try {
    const { chatId } = req.body;

    if (!chatId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required 5" });
    }

    const [chat, user] = await Promise.all([
      Chat.findById(chatId),
      User.findById(req.user.userId, "name"),
    ]);
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    const files = req.files || [];

    console.log("files_police", files);

    if (!req.files || req.files.length < 1) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    //upload files to cloudinary
    const attachments = await uploadFilesToCloudinary(files);
    const messageForDB = {
      content: "",
      attachments,
      sender: user._id,
      chat: chatId,
    };
    const messageForRealTime = {
      ...messageForDB,
      sender: {
        _id: user._id,
        name: user.name,
      },
    };

    console.log("messageForDB", messageForDB);

    const message = new Message(messageForDB);

    await message.save();

    emitEvent(req, NEW_MESSAGE, chat.members, {
      message: messageForRealTime,
      chat: chatId,
    });
    emitEvent(req, NEW_MESSAGE_ALERT, chat.members, {
      chat: chatId,
    });

    res.status(200).json({ success: true, message });
  } catch (error) {
    console.log(error);
  }
};

export const getChatDetails = async (req, res) => {
  try {
    const chatId = req.params.id;

    console.log("chatId", chatId);

    if (!chatId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required 6" });
    }
    if (req.query.populate === "true") {
      console.log("populate");
      const chat = await Chat.findById(chatId)
        .populate("members", "name username avatar")
        .lean();

      console.log("chatde", chat);

      if (!chat) {
        return res
          .status(404)
          .json({ success: false, message: "Chat not found" });
      }

      chat.members = chat.members.map((member) => {
        // console log member
        console.log("member", member);
        return {
          _id: member?._id,
          name: member?.name,
          username: member?.username,
          avatar: member?.avatar?.url || "",
        };
      });

      return res.status(200).json({ success: true, chat });
    } else {
      const chat = await Chat.findById(chatId);

      if (!chat) {
        return res
          .status(404)
          .json({ success: false, message: "Chat not found" });
      }

      return res.status(200).json({ success: true, chat });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const renameGroup = async (req, res) => {
  try {
    const chatId = req.params.id;
    const { name } = req.body;

    if (!chatId || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required 7" });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    if (!chat.groupChat) {
      return res
        .status(400)
        .json({ success: false, message: "This is not a group chat" });
    }

    if (chat.creator.toString() !== req.user.userId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You are not the creator of this group",
      });
    }

    chat.name = name;
    await chat.save();

    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({ success: true, message: "Group renamed" });
  } catch (error) {
    console.log(error);
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId, accept } = req.body;

    if (!requestId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required 123" });
    }

    const request = await Request.findById(requestId)
      .populate("sender", "name")
      .populate("receiver", "name");

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

export const deleteChat = async (req, res) => {
  try {
    const chatId = req.params.id;

    // Validate chat ID
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    // Check if the user has permission to delete the chat
    if (
      chat.groupChat &&
      chat.creator.toString() !== req.user.userId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "You are not the creator of this group",
      });
    }

    if (!chat.groupChat && !chat.members.includes(req.user.userId)) {
      return res.status(400).json({
        success: false,
        message: "You are not a member of this chat",
      });
    }

    // Find messages with attachments
    const messagesWithAttachments = await Message.find({
      chat: chatId,
      attachments: { $exists: true, $ne: [] },
    });

    // Collect public_ids of files to delete from Cloudinary
    const public_ids = [];
    messagesWithAttachments.forEach((message) => {
      message.attachments.forEach((attachment) =>
        public_ids.push(attachment.public_id)
      );
    });

    // Delete files from Cloudinary, delete chat, and delete messages in parallel
    await Promise.all([
      deleteFilesFromCloudinary(public_ids), // This function should handle deleting files from Cloudinary
      chat.deleteOne(), // Delete the chat document
      Message.deleteMany({ chat: chatId }), // Delete all messages in this chat
    ]);

    // Emit an event to notify the members that the chat has been deleted
    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({ success: true, message: "Chat deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const chatId = req.params.id;
    const { page = 1 } = req.query;
    const limit = 20;
    const skip = (page - 1) * limit;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    if (!chat.members.includes(req.user.userId)) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this chat",
      });
    }

    const [messages, totalMessagesCount] = await Promise.all([
      Message.find({ chat: chatId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .populate("sender", "name avatar")
        .lean(),
      Message.countDocuments({ chat: chatId }),
    ]);

    const totalPages = Math.ceil(totalMessagesCount / limit);
    const hasNextPage = page < totalPages;

    return res.status(200).json({
      success: true,
      messages,
      totalMessagesCount,
      totalPages,
      hasNextPage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

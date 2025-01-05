import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import Chat from "../model/chat.js";
import { emitEvent } from "../utils/emitEvent.js";
import { getOtherMember } from "../utils/helper.js";

export const newGroupChat = async (req, res) => {
  try {
    const { name, members } = req.body;
    console.log(name, members);
    if (!name || !members) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (members.length < 2) {
      return res
        .status(400)
        .json({ success: false, message: "At least 2 members are required" });
    }

    const allmembers = [...members, req.user.userId];
    console.log(allmembers);

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
    const group = await Chat.find({
      members: {
        $in: [req.user.userId],
        groupChat: true,
        creator: req.user.userId,
      },
    }).populate("members", "name username avatar");
    res.status(200).json({ success: true, group });
  } catch (error) {
    console.log(error);
  }
};

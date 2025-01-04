/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack
      width={w}
      direction="column"
      sx={{
        overflow: "auto",
        height: "calc(100vh - 4rem)",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {chats?.map((chat, index) => {
        const { avatar, _id, name, members, groupChat } = chat;

        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );
        const isOnline = members.some((memberId) => onlineUsers.includes(_id));

        return (
          <ChatItem
            key={_id}
            isOnline={isOnline}
            newMessageAlert={newMessageAlert} // pass `newMessage` properly
            avatar={avatar}
            _id={_id}
            name={name}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
            index={index}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;

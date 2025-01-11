/* eslint-disable react/prop-types */
import { IconButton, Stack } from "@mui/material";
import { useRef, useState } from "react";
import { grayColor, orange } from "../components/constants/color";
import AttachmentIcon from "@mui/icons-material/Attachment";
import SendIcon from "@mui/icons-material/Send";
import { InputBox } from "../components/styles/styledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessage } from "../components/constants/SampleData";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { NEW_MESSAGE } from "../components/constants/events";
import { useChatDetailsQuery } from "../redux/api/chatAPI/chatApi";

const sampleUser = {
  _id: "1",
  name: "Jane Doe",
};

const Chat = ({ chatId = "" }) => {
  const containerRef = useRef(null);
  const socket = getSocket();
  const [message, setMessage] = useState("");
  const { data: chatDetails, isLoading } = useChatDetailsQuery({ chatId });
  const members = chatDetails?.chat?.members || [];
  console.log("asdfsadfasdf", members);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  return isLoading ? (
    <>
      <h1>Loading...</h1>
    </>
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding="1rem"
        spacing={2} // Spacing as a number
        bgcolor={grayColor}
        height="90%" // Changed to "90vh" for better height handling
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in WebKit-based browsers
          scrollbarWidth: "none", // Hide scrollbar in Firefox
        }}
      >
        {/* render messages */}
        {sampleMessage.map((message) => (
          <MessageComponent
            key={message._id}
            message={message}
            user={sampleUser}
          />
        ))}
      </Stack>
      <form onSubmit={submitHandler} style={{ height: "10%" }}>
        <Stack
          height={"100%"}
          position={"relative"}
          direction={"row"}
          alignItems={"center"}
          padding={"0.5rem"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "0.8rem",
              rotate: "-40deg",
            }}
          >
            <AttachmentIcon />
          </IconButton>
          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/* InputBox component */}
          <IconButton
            type="submit"
            sx={{
              display: "flex", // Ensure flex alignment
              justifyContent: "center", // Center icon horizontally
              alignItems: "center", // Center icon vertically
              backgroundColor: orange,
              color: "white",
              fontSize: "0.5rem",
              padding: "0.4rem", // Maintain padding for the button
              marginLeft: "0.5rem",
              "&:hover": {
                backgroundColor: "error.dark",
              },
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </>
  );
};

export default Chat;

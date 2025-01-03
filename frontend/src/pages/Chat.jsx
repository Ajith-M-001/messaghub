import { IconButton, Stack } from "@mui/material";
import { useRef } from "react";
import { grayColor, orange } from "../components/constants/color";
import AttachmentIcon from "@mui/icons-material/Attachment";
import SendIcon from "@mui/icons-material/Send";
import { InputBox } from "../components/styles/styledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessage } from "../components/constants/SampleData";
import MessageComponent from "../components/shared/MessageComponent";

const sampleUser = {
  _id: "1",
  name: "Jane Doe",
};

const Chat = () => {
  const containerRef = useRef(null);

  return (
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
      <form style={{ height: "10%" }}>
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
          <InputBox placeholder="Type Message Here..." />
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

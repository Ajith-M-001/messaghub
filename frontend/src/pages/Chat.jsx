/* eslint-disable react/prop-types */
import { IconButton, Stack } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { grayColor, orange } from "../components/constants/color";
import AttachmentIcon from "@mui/icons-material/Attachment";
import SendIcon from "@mui/icons-material/Send";
import { InputBox } from "../components/styles/styledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import {
  ALERT,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../components/constants/events";
import {
  useChatDetailsQuery,
  useGetMessagesQuery,
} from "../redux/api/chatAPI/chatApi";
import { useSocket } from "../hooks/hooks";
import { useInfiniteScrollTop } from "6pp";
import { setIsFileMenu } from "../redux/slices/misc";
import { useDispatch } from "react-redux";
import { removeNewMessagesAlert } from "../redux/slices/chat";
import { TypingLoader } from "../components/loaders";
import { useNavigate } from "react-router";

const Chat = ({ chatId = "", user }) => {
  const containerRef = useRef(null);
  const socket = getSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [iAmTyping, setIAmTyping] = useState(false);
  const [UserTyping, setUserTyping] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { data: chatDetails, isLoading } = useChatDetailsQuery({ chatId });
  const members = chatDetails?.chat?.members || [];
  const navigate = useNavigate();

  const bottomRef = useRef(null);

  const typingTimeOut = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  useEffect(() => {
    dispatch(removeNewMessagesAlert(chatId));
    return () => {
      setMessages([]);
      setPage(1);
      setMessage("");
      setOldMessages([]);
    };
  }, [chatId]);

  const newMessagesHandler = useCallback(
    (data) => {
      if (data?.chatId !== chatId) return;
      setMessages((prevMessages) => [...prevMessages, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data?.chatId !== chatId) return;
      console.log("start typing", data);
      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data?.chatId !== chatId) return;
      console.log("stop typing", data);
      setUserTyping(false);
    },
    [chatId]
  );

  const AlertListener = useCallback(
    (content) => {
      const messageForAlert = {
        content,
        sender: {
          _id: "fdsfsdafasdf",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(), // Corrected this line
      };

      setMessages((prevMessages) => [...prevMessages, messageForAlert]);
    },
    [chatId]
  );

  const eventHandler = {
    [ALERT]: AlertListener,
    [NEW_MESSAGE]: newMessagesHandler,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocket(socket, eventHandler);

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk?.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk?.data?.messages
  );

  const allMessages = [...oldMessages, ...messages];

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const messageOnChangeHandler = (e) => {
    setMessage(e.target.value);
    if (!iAmTyping) {
      socket.emit(START_TYPING, { chatId, members });
      setIAmTyping(true);
    }
    if (typingTimeOut.current) clearTimeout(typingTimeOut.current);

    typingTimeOut.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { chatId, members });
      setIAmTyping(false);
    }, 2000);
  };

  useEffect(() => {
    if (UserTyping) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [UserTyping]);

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
        }}
      >
        {/* render messages */}
        {allMessages.map((message) => (
          <MessageComponent key={message._id} message={message} user={user} />
        ))}
        {UserTyping && <TypingLoader />}
        <div ref={bottomRef} />
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
            onClick={handleFileOpen}
          >
            <AttachmentIcon />
          </IconButton>
          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={messageOnChangeHandler}
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
      <FileMenu chatId={chatId} anchorEl={fileMenuAnchor} />
    </>
  );
};

export default Chat;

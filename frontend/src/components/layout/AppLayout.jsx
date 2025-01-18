import { Drawer, Grid2, Skeleton } from "@mui/material";
import Title from "../shared/Title";
import Header from "./Header";
import ChatList from "../specific/ChatList";
import { useNavigate, useParams } from "react-router";
import Profile from "../specific/Profile";
import { useGetChatQuery } from "../../redux/api/chatAPI/chatApi";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMisc,
  setIsDeleteMenu,
  setIsMobile,
  setSelectedDeleteChat,
} from "../../redux/slices/misc";
import { selectAuth } from "../../redux/slices/auth";
import { useSocket } from "../../hooks/hooks";
import { getSocket } from "../../socket";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../constants/events";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  incrementNotification,
  selectchat,
  setNewMessagesAlert,
} from "../../redux/slices/chat";
import { getOrSaveFromStorage } from "../../lib/features";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";

const AppLayout = (WrappedComponent) => {
  const LayoutComponent = (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const { chatId } = params;
    const { newMessagesAlet } = useSelector(selectchat);
    const { data, isLoading, refetch } = useGetChatQuery();
    const navigate = useNavigate();
    const deleteMenuAnchor = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
      getOrSaveFromStorage({
        key: NEW_MESSAGE_ALERT,
        value: newMessagesAlet,
      });
    }, [newMessagesAlet]);

    const newMessagesAlertHandler = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [dispatch, chatId]
    );
    const newRequestHandler = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const onlineUserslistener = useCallback((data) => {
      setOnlineUsers(data);
    }, []);

    const eventHandler = {
      [NEW_MESSAGE_ALERT]: newMessagesAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUserslistener,
    };
    const socket = getSocket();

    useSocket(socket, eventHandler);

    const { isMobile } = useSelector(selectMisc);

    const { user } = useSelector(selectAuth);

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      deleteMenuAnchor.current = e.currentTarget;
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
    };

    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };

    return (
      <>
        <Title title="MessageHup" />
        <Header />

        <DeleteChatMenu
          dispatch={dispatch}
          deleteOptionalAnchor={deleteMenuAnchor.current}
        />
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={"5rem"} />
          ))
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w={"70vw"}
              chats={data?.transformedChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlet}
              onlineUsers={onlineUsers}
            />
          </Drawer>
        )}

        <Grid2 container sx={{ height: "calc(100vh - 5rem)" }}>
          <Grid2
            size={{ sm: 4, md: 3 }}
            sx={{ display: { xs: "none", sm: "block" } }}
            height={"100%"}
          >
            {isLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} variant="rectangular" height={"5rem"} />
              ))
            ) : (
              <ChatList
                chats={data?.transformedChats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlet}
                onlineUsers={onlineUsers}
              />
            )}
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 8, md: 5, lg: 6 }} height={"100%"}>
            <WrappedComponent user={user} {...props} chatId={chatId} />
          </Grid2>
          <Grid2
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
            size={{ md: 4, lg: 3 }}
            height={"100%"}
          >
            <Profile />
          </Grid2>
        </Grid2>

        {/* <Footer /> */}
      </>
    );
  };

  // Set display name for debugging purposes
  LayoutComponent.displayName = `WithAppLayout(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return LayoutComponent;
};

export default AppLayout;

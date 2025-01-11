import { Drawer, Grid2, Skeleton } from "@mui/material";
import Title from "../shared/Title";
import Header from "./Header";
import ChatList from "../specific/ChatList";
import { sampleChats } from "../constants/SampleData";
import { useParams } from "react-router";
import Profile from "../specific/Profile";
import { useGetChatQuery } from "../../redux/api/chatAPI/chatApi";
import { useDispatch, useSelector } from "react-redux";
import { selectMisc, setIsMobile } from "../../redux/slices/misc";
import { getSocket } from "../../socket";

const AppLayout = (WrappedComponent) => {
  const LayoutComponent = (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const { chatId } = params;


    const { isMobile } = useSelector(selectMisc);

    const { data, isLoading } = useGetChatQuery();
    console.log(data);

    const handleDeleteChat = (e, chatId, groupChat) => {
      e.preventDefault();
      console.log("Delete chat with id: ", chatId, groupChat);
    };

    const newMessagesAlerts = [
      { chatId: "1", count: 4 },
      { chatId: "2", count: 0 },
    ];

    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };
    return (
      <>
        <Title title="MessageHup" />
        <Header />
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
                newMessagesAlert={newMessagesAlerts}
                onlineUsers={["1"]} // Example online users
              />
            )}
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 8, md: 5, lg: 6 }} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} />
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

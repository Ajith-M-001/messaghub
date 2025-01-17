/* eslint-disable react/prop-types */
import { Menu, Stack } from "@mui/material";
import { selectMisc, setIsDeleteMenu } from "../../redux/slices/misc";
import { useSelector } from "react-redux";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import {
  useDeleteChatMutation,
  useLeaveGroupMutation,
} from "../../redux/api/chatAPI/chatApi";
import toast from "react-hot-toast";

const DeleteChatMenu = ({ dispatch, deleteOptionalAnchor }) => {
  const navigate = useNavigate();
  const { isDeleteMenu, selectedDeleteChat } = useSelector(selectMisc);

  const [deleteChat] = useDeleteChatMutation();
  const [leaveGroup] = useLeaveGroupMutation();
  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteOptionalAnchor.current = null;
  };

  const leaveGroupHandler = async () => {
    try {
      const response = await leaveGroup(selectedDeleteChat.chatId);
      toast.success(response.data.message);
      if (response.data.success === "success") {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      closeHandler();
    }
  };

  const deleteChatHandler = async () => {
    try {
      const response = await deleteChat(selectedDeleteChat.chatId);
      toast.success(response.data.message);
      if (response.data.success === "success") {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      closeHandler();
    }
  };
  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteOptionalAnchor}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Stack
        sx={{ width: "10rem", padding: "0.5rem", cursor: "pointer" }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={
          selectedDeleteChat?.groupChat ? leaveGroupHandler : deleteChatHandler
        }
      >
        {selectedDeleteChat?.groupChat ? (
          <>
            <ExitToAppIcon />
            <span>leave Group</span>
          </>
        ) : (
          <>
            <DeleteIcon />
            <span>Delete Chat</span>
          </>
        )}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;

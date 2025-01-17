/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import {
  Backdrop,
  Button,
  // CircularProgress,
  Drawer,
  Grid2,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useSearchParams } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import { lazy, memo, Suspense, useEffect, useState } from "react";
import { Link } from "../components/styles/styledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats, sampleUsers } from "../components/constants/SampleData";
import CreateIcon from "@mui/icons-material/Create";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import UserItems from "../components/shared/UserItems";
import {
  useAddGroupMemberMutation,
  useChatDetailsQuery,
  useDeleteChatMutation,
  useGetMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/chatAPI/chatApi";
import { MUILayoutCircularLoader } from "../components/loaders";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectMisc, setIsAddMember } from "../redux/slices/misc";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const Group = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("group");
  const [groupName, setGroupName] = useState("");
  const [updatedGroupName, setUpdatedGroupName] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const { data, isLoading } = useGetMyGroupsQuery();
  const dispatch = useDispatch();
  const { isAddMember } = useSelector(selectMisc);
  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  const [renameGroup] = useRenameGroupMutation();
  const [removeMember] = useRemoveGroupMemberMutation();
  const [deleteGroup, { isLoadingDelete }] = useDeleteChatMutation();

  useEffect(() => {
    if (groupDetails.data) {
      setGroupName(groupDetails?.data?.chat?.name);
      setUpdatedGroupName(groupDetails?.data?.chat?.name);
    }

    return () => {
      setGroupName("");
      setUpdatedGroupName("");
      setIsEdited(false);
    };
  }, [groupDetails.data]);

  const removeMemberHandler = async (userId) => {
    try {
      const response = await removeMember({
        chatId,
        userId,
      });
      console.log("fdsfsdf", response.error.data.message);
      if (response.data.success === "success") {
        toast.success(response.data.message);
      } else if (response.error.data.message) {
        toast.error(response.error.data.message);
      }
    } catch (error) {
      console.log(error?.error);
    }
  };

  const openconfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeconfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const deleteHandler = async (chatId) => {
    try {
      const response = await deleteGroup(chatId);
      console.log("delete group response", response);
      navigate("/groups");
    } catch (error) {
      console.log("error", error);
    } finally {
      setConfirmDeleteDialog(false);
    }
  };

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setUpdatedGroupName(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setUpdatedGroupName("");
      setIsEdited(false);
    };
  }, [chatId]);

  const handleUpladateGroupName = async () => {
    try {
      const response = await renameGroup({
        chatId,
        name: updatedGroupName,
      });
      console.log(response);
      setGroupName(updatedGroupName);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsEdited(false);
    }
  };

  const naviagateBack = () => {
    navigate("/");
  };

  const handleMobileClose = () => {
    setIsMobile(false);
  };

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };
  const IconsBtn = (
    <>
      <IconButton
        onClick={handleMobile}
        sx={{
          position: "absolute",
          right: "2rem",
          top: "2rem",
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Tooltip title="back">
        <IconButton
          onClick={naviagateBack}
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "rgba(0,0,0,0.8)",
            color: "white",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.7)", // Fixed the hover style
            },
          }}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      padding={"2rem"}
      justifyContent={"center"}
    >
      {isEdited ? (
        <>
          <TextField
            name="groupName"
            value={updatedGroupName}
            onChange={(e) => setUpdatedGroupName(e.target.value)}
          />
          <IconButton onClick={handleUpladateGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setIsEdited(true)}>
            <CreateIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const buttonGroup = (
    <>
      <Stack
        direction={{ xs: "column-reverse", sm: "row" }}
        spacing={"1rem"}
        p={{ xs: "0.5rem", sm: "1rem", md: "1rem 4rem" }}
      >
        <Button
          onClick={openconfirmDeleteHandler}
          startIcon={<DeleteIcon />}
          size="medium"
          variant="outlined"
          color="error"
        >
          Delete Group
        </Button>
        <Button
          onClick={openAddMemberHandler}
          startIcon={<AddIcon />}
          size="medium"
          variant="contained"
        >
          Add Member
        </Button>
      </Stack>
    </>
  );

  return isLoading ? (
    <MUILayoutCircularLoader />
  ) : (
    <Grid2 bgcolor={"rgba(0,0,0,0.1)"} container height={"100vh"}>
      <Grid2
        bgcolor={"bisque"}
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        size={{ sm: 4 }}
      >
        <GroupList myGroups={data.groups} chatId={chatId} />
      </Grid2>
      <Grid2
        size={{ xs: 12, sm: 8 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconsBtn}

        {groupName && (
          <>
            {GroupName}
            <Typography
              margin={"2rem"}
              variant="body1"
              alignSelf={"flex-start"}
            >
              members
            </Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{ sm: "1rem ", xs: "0", md: "1rem 4rem" }}
              spacing={"2rem"}
              height={"50%"}
              overflow={"auto"}
            >
              {/* group members */}
              {groupDetails?.data?.chat?.members.map((user) => (
                <UserItems
                  key={user._id}
                  user={user}
                  isAdded
                  styling={{
                    boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 5px",
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                  }}
                  handler={removeMemberHandler}
                />
              ))}
            </Stack>
            {buttonGroup}
          </>
        )}
      </Grid2>

      {isAddMember && (
        <Suspense fallback={<Backdrop open={true} />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open={true} />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeconfirmDeleteHandler}
            deleteHandler={() => deleteHandler(groupDetails.data.chat._id)}
          />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobile}
        onClose={handleMobileClose}
      >
        <GroupList w={"50vw"} myGroups={data.groups} chatId={chatId} />
      </Drawer>
    </Grid2>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <Stack
      width={w}
      padding={"1rem"}
      sx={{
        overflow: "auto",
        height: "calc(100vh - 4rem)",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {myGroups.length > 0 ? (
        myGroups.map((group) => (
          <GroupListItem key={group._id} group={group} chatId={chatId} />
        ))
      ) : (
        <Typography textAlign={"center"} padding={"1rem"} variant="h6">
          No groups found
        </Typography>
      )}
    </Stack>
  );
};

const GroupListItem = memo(({ group, chatId }) => {
  const { name, _id, avatar } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
    >
      <Stack direction={"row"} spacing={"3.5rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography textAlign="center" variant="h6">
          {name}
        </Typography>
      </Stack>
    </Link>
  );
});

export default Group;

//  <Button
//    startIcon={
//      isDeleting ? <CircularProgress color="error" size={14} /> : <DeleteIcon /> // Conditionally render spinner or icon
//    }
//    size="medium"
//    variant="outlined"
//    color="error"
//  >
//    {isDeleting ? "deleting group" : "Group Delete"}
//  </Button>;

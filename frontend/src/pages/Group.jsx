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

  const isAddmember = false;

  const removeMemberHandler = (id) => {
    console.log("remove member", id);
  };

  const openconfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeconfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const deleteHandler = () => {
    console.log("delete group");
    setConfirmDeleteDialog(false);
  };

  const openAddMemberHandler = () => {
    console.log("add member");
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

  const handleUpladateGroupName = () => {
    console.log("update group name", updatedGroupName);
    setGroupName(updatedGroupName);
    setIsEdited(false);
  };

  const [isEdited, setIsEdited] = useState(false);

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

  return (
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
        <GroupList myGroups={sampleChats} chatId={chatId} />
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
              {sampleUsers.map((user) => (
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

      {isAddmember && (
        <Suspense fallback={<Backdrop open={true} />}>
          <AddMemberDialog open={true} />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open={true} />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeconfirmDeleteHandler}
            deleteHandler={deleteHandler}
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
        <GroupList w={"50vw"} myGroups={sampleChats} chatId={chatId} />
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

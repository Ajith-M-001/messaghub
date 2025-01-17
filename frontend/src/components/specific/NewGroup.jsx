import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import UserItems from "../shared/UserItems";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAvailableFriendsQuery } from "../../redux/api/userAPI/userApi";
import { selectMisc, setIsNewGroup } from "../../redux/slices/misc";
import toast from "react-hot-toast";
import { useCreateNewGroupMutation } from "../../redux/api/chatAPI/chatApi";

const NewGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const dispatch = useDispatch();
  const { isNewGroup } = useSelector(selectMisc);

  const { data, isLoading } = useAvailableFriendsQuery();
  const [createNewGroup, { isNewGroupLoading }] = useCreateNewGroupMutation();

  console.log(data);

  const seleteMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const submitHandler = async () => {
    if (!groupName) return toast.error("Group name is required");
    if (selectedMembers.length < 2)
      return toast.error("At least 2 members are required");

    try {
      const response = await createNewGroup({
        name: groupName,
        members: selectedMembers,
      });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };
  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        spacing={"1rem"}
        width={"25rem"}
        maxWidth={"md"}
      >
        <DialogTitle variant="h4" textAlign={"center"}>
          New Group
        </DialogTitle>
        <TextField
          name="groupName"
          label="Group Name"
          variant="outlined"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Typography>Members</Typography>
        <Stack>
          {isLoading
            ? "Loading..."
            : data.friends.map((user) => (
                <UserItems
                  user={user}
                  key={user._id}
                  handler={seleteMemberHandler}
                  isAdded={selectedMembers.includes(user._id)}
                />
              ))}
        </Stack>
        <Stack spacing={2} direction={"row"} justifyContent={"flex-end"}>
          <Button onClick={closeHandler} variant="outlined" color="error">
            Cancel
          </Button>
          <Button
            disabled={isNewGroupLoading}
            variant="contained"
            onClick={submitHandler}
          >
            {isNewGroupLoading ? "Creating..." : "Create"}
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;

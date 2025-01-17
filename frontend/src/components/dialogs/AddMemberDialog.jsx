/* eslint-disable react/prop-types */

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { sampleUsers } from "../constants/SampleData";
import UserItems from "../shared/UserItems";
import { useState } from "react";
import { useAddGroupMemberMutation } from "../../redux/api/chatAPI/chatApi";
import { useDispatch, useSelector } from "react-redux";
import { selectMisc, setIsAddMember } from "../../redux/slices/misc";
import { useAvailableFriendsQuery } from "../../redux/api/userAPI/userApi";

const AddMemberDialog = ({ chatId }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [addMember, { isLoadingAddMember }] = useAddGroupMemberMutation();
  const { isAddMember } = useSelector(selectMisc);
  const dispatch = useDispatch();
  const { data } = useAvailableFriendsQuery();
  console.log("dfasdfasdf", data);

  const seleteMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addMemberSubmitHandler = async () => {
    try {
      const response = await addMember({
        chatId,
        members: selectedMembers,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
    setSelectedMembers([]);
  };
  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"1rem"} width={"20rem"} spacing={"1rem"}>
        <DialogTitle
          width={"100%"}
          textAlign={"center"}
          id="alert-dialog-title"
        >
          {"Add Member"}
        </DialogTitle>
      </Stack>

      <DialogContent>
        <Stack>
          {data?.friends.length > 0 ? (
            data?.friends.map((user) => (
              <UserItems
                key={user._id}
                user={user}
                handler={seleteMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>
        <DialogActions>
          <Stack direction={{ xs: "column-reverse", sm: "row" }} spacing={2}>
            <Button onClick={closeHandler} color="error" variant="outlined">
              Cancel
            </Button>
            <Button
              disabled={isLoadingAddMember}
              onClick={addMemberSubmitHandler}
              color="primary"
              variant="contained"
              autoFocus
            >
              Add
            </Button>
          </Stack>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;

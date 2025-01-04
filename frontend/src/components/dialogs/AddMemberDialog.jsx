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

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const seleteMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    closeHandler();
  };

  const closeHandler = () => {
    console.log("close");
    setSelectedMembers([]);
    setMembers([]);
  };
  return (
    <Dialog open={true} onClose={closeHandler}>
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
          {members.length > 0 ? (
            members.map((user) => (
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

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

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const addFriendHandler = (id) => {
    console.log("add friend", id);
  };

  const addMemberSubmitHandler = () => {
    console.log("add member");
  };

  const closeHandler = () => {
    console.log("close");
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
          {sampleUsers.length > 0 ? (
            sampleUsers.map((user) => (
              <UserItems
                key={user._id}
                user={user}
                handler={addFriendHandler}
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

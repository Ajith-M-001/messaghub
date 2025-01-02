import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { sampleUsers } from "../constants/SampleData";
import UserItems from "../shared/UserItems";
import { useState } from "react";

const NewGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const seleteMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  console.log("selectedMembers", selectedMembers);

  const submitHandler = () => {
    console.log("Submit");
  };

  const closeHandler = () => {
    console.log("Close");
  };
  return (
    <Dialog open onClose={closeHandler}>
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
          {members.map((user) => (
            <UserItems
              user={user}
              key={user._id}
              handler={seleteMemberHandler}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))}
        </Stack>
        <Stack spacing={2} direction={"row"} justifyContent={"flex-end"}>
          <Button variant="outlined" color="error">
            Cancel
          </Button>
          <Button variant="contained" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;

import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import UserItems from "../shared/UserItems";
import { sampleUsers } from "../constants/SampleData";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(sampleUsers);

  const addFriendHandler = (id) => {
    console.log(`Add friend ${id}`);
  };

  const isLoadingsendFriendRequest = false;

  return (
    <Dialog open>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search}
          name="search"
          placeholder="Search"
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          onChange={(e) => setSearch(e.targetValue)}
        />

        <List>
          {users.map((user) => (
            <UserItems
              user={user}
              key={user._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingsendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;

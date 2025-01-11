import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import UserItems from "../shared/UserItems";
import { useDispatch, useSelector } from "react-redux";
import { selectMisc, setIsSearch } from "../../redux/slices/misc";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/userAPI/userApi";
import toast from "react-hot-toast";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, { isLoading: isLoadingsendFriendRequest }] =
    useSendFriendRequestMutation();

  const { isSearch } = useSelector(selectMisc);

  const addFriendHandler = async (id) => {
    try {
      const response = await sendFriendRequest({ userId: id }).unwrap();
      toast.success(response.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      try {
        const response = await searchUser(search).unwrap();
        setUsers(response.users);
      } catch (error) {
        console.log(error);
      }
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [search, searchUser]);

  const hanldesearchClose = () => {
    dispatch(setIsSearch(false));
  };

  return (
    <Dialog open={isSearch} onClose={hanldesearchClose}>
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
          onChange={(e) => setSearch(e.target.value)}
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

/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  Stack,
  Typography,
  Avatar,
  ListItem,
  Button,
  Skeleton,
} from "@mui/material";
import { sampleNotification } from "../constants/SampleData";
import { memo } from "react";
import { useGetNotificationQuery } from "../../redux/api/userAPI/userApi";
import { transformImage } from "../../lib/features";
import { useDispatch, useSelector } from "react-redux";
import { selectMisc, setIsNotification } from "../../redux/slices/misc";
import toast from "react-hot-toast";
import { useAcceptFriendRequestMutation } from "../../redux/api/chatAPI/chatApi";

console.log(sampleNotification);

const Notifications = () => {
  const { isNotification } = useSelector(selectMisc);
  const dispatch = useDispatch();

  const { data, isLoading } = useGetNotificationQuery();
  const [acceptFriendRequest, { isLoading: isLoadingsendFriendRequest }] =
    useAcceptFriendRequestMutation();

  console.log(data?.allRequest);
  const FriendRequestHandler = async ({ _id, accept }) => {
    console.log(`Friend request from ${_id} accepted ${accept}`);
    try {
      const response = await acceptFriendRequest({
        requestId: _id,
        accept,
      }).unwrap();
      console.log(response);
      toast.success(response.message);
      dispatch(setIsNotification(false));
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotificationClose = () => {
    dispatch(setIsNotification(false));
  };

  return (
    <Dialog open={isNotification} onClose={handleNotificationClose}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"md"}>
        <DialogTitle>Notifications</DialogTitle>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={"1rem"} />
          ))
        ) : data?.allRequest?.length > 0 ? (
          <>
            {data?.allRequest.map((notification) => (
              <NotificationItem
                key={notification._id}
                sender={notification.sender}
                _id={notification._id}
                handler={FriendRequestHandler}
              />
            ))}
          </>
        ) : (
          <Typography textAlign={"center"} variant="body1" color="initial">
            0 notifications
          </Typography>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem
      sx={{
        width: "100%",
        py: 1, // Add vertical padding
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        width="100%"
        sx={{
          minHeight: 48, // Ensure consistent height
        }}
      >
        <Avatar src={transformImage(avatar)} alt={name} />

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            margin: "auto 0", // Center vertically
          }}
        >
          {name} wants to be your friend on ChatApp 🎉
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          sx={{ margin: "auto 0" }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;

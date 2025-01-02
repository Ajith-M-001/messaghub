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
} from "@mui/material";
import { sampleNotification } from "../constants/SampleData";
import { memo } from "react";

console.log(sampleNotification);

const Notifications = () => {
  const FriendRequestHandler = ({ _id, accept }) => {
    console.log(`Friend request from ${_id} accepted`);
  };

  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"md"}>
        <DialogTitle>Notifications</DialogTitle>
        {sampleNotification.length > 0 ? (
          <>
            {sampleNotification.map((notification) => (
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
        <Avatar />

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

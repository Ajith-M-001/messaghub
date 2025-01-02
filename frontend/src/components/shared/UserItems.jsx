/* eslint-disable react/prop-types */
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import { memo } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const UserItems = ({ user, handler, handlerIsLoading }) => {
  const { _id, name, avatar } = user;

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
        <Avatar
          src={avatar}
          alt={name}
          sx={{
            width: 40,
            height: 40,
          }}
        />

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
          {name}
        </Typography>

        <IconButton
          size="small"
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
          sx={{
            color: "text.secondary",
            "&:hover": {
              color: "text.primary",
            },
            "&.Mui-disabled": {
              opacity: 0.5,
            },
            padding: 1,
            margin: "auto 0", // Center vertically
          }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItems);

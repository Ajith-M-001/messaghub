/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */

import { memo } from "react";
import { Link } from "../styles/styledComponents"; // Import the styled Link component
import { Stack, Typography, Box } from "@mui/material"; // MUI components
import AvatarCard from "./AvatarCard";
import { motion } from "framer-motion";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  handleDeleteChat,
  index = 0,
}) => {
  return (
    <Link
      sx={{ padding: "0" }}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      to={`/chat/${_id}`}
    >
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{  delay: index * 0.1 }}
        style={{
          display: "flex",
          gap: "3.5rem",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
        }}
      >
        {/* Avatar */}
        <AvatarCard avatar={avatar} />

        <Stack direction="column">
          <Typography>{name}</Typography>

          {newMessageAlert?.count > 0 && (
            <Typography>
              {newMessageAlert.count} New Message
              {newMessageAlert.count > 1 ? "s" : ""}
            </Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);

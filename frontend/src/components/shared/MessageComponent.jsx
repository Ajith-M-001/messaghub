/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { lightBlue } from "../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const sameSender = sender?._id === user?._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        padding: "0.5rem",
        borderRadius: "5px",
        width: "fit-content",
      }}
    >
      <Typography color={lightBlue} variant="caption">
        {sameSender ? "You" : sender?.name}
      </Typography>
      {content && <p style={{ margin: 0 }}>{content}</p>}
      {/* attachments */}
      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);
          console.log("attachment", attachment.url);

          return (
            <Box key={index}>
              <a href={url} target="_blank" download style={{ color: "black" }}>
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}
      <Typography color="text.secondary" variant="caption">
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);

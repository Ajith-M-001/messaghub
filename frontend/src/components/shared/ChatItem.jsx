/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { Box, Stack, Typography } from "@mui/material";
// import { Link } from "../styles/styledComponents";
// import { memo } from "react";

// const ChatItem = ({
//   avatar = [],
//   name,
//   _id,
//   groupChat = false,
//   sameSender,
//   isOnline,
//   newMessage,
//   index = 0,
//   handleDeleteChatOpen,
// }) => {
//   return (
//     <Link
//       sx={{ padding: "0rem" }}
//       to={`/chat/${_id}`}
//       onContextMenu={(e) => handleDeleteChatOpen(e, _id, groupChat)}
//       style={{ textDecoration: "none" }}
//     >
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: "1rem",
//           padding: "1rem",
//           backgroundColor: sameSender ? "#f0f0f0" : "unset",
//           color: sameSender ? "black" : "unset",
//           position: "relative",
//         }}
//       >
//         {/* avatar and chat info */}
//         <Stack direction="row" alignItems="center" spacing={2}>
//           <img
//             src={avatar}
//             alt={name}
//             style={{ width: "50px", height: "50px", borderRadius: "50%" }}
//           />
//           <Stack>
//             <Typography variant="h6">{name}</Typography>
//             {newMessage.count > 0 && (
//               <Typography>{newMessage.count} new Message</Typography>
//             )}
//           </Stack>
//         </Stack>

//         {isOnline && (
//           <Box
//             sx={{
//               width: "10px",
//               height: "10px",
//               borderRadius: "50%",
//               backgroundColor: "green",
//               position: "absolute",
//               top: "50%",
//               right: "1rem",
//               transform: "translateY(-50%)",
//             }}
//           />
//         )}
//       </div>
//     </Link>
//   );
// };

// export default memo(ChatItem);

import { memo } from "react";
import { Link } from "../styles/StyledComponents"; // Import the styled Link component
import { Stack, Typography, Box } from "@mui/material"; // MUI components
import AvatarCard from "./AvatarCard";

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
      <div
        style={{
          display: "flex",
          gap: "1rem",
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
      </div>
    </Link>
  );
};

export default memo(ChatItem);

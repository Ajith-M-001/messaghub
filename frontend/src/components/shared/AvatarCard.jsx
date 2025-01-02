/* eslint-disable react/prop-types */
import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";

//todo transform this into a reusable component
const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup max={max}>
        <Box width={"5rem"} height={"3rem"}>
          {avatar.map((i, index) => (
            <Avatar
              key={Math.random() * 100}
              src={i}
              alt={`avatar-${index}`}
              sx={{
                width: "3rem",
                height: "3rem",
                position: "absolute",
                left: {
                  xs: `${index + 1}rem`,
                  sm: `${index + 0.8}rem`,
                },
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;

/* eslint-disable react/prop-types */
import { Avatar, Stack, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge"; // For the Name field
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import moment from "moment";
const ProfileCard = ({ text, Icon, heading }) => {
  return (
    <Stack
      color={"white"}
      textAlign={"center"}
      spacing={"1rem"}
      direction={"row"}
      alignContent={"center"}
    >
      {Icon && <Icon />}
      <Stack>
        <Typography variant="body1">{text}</Typography>
        <Typography color="gray" variant="caption">
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction="column" alignItems={"center"}>
      <Avatar
        sx={{
          width: "6.25rem",
          height: "6.25rem",
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard
        heading="Bio"
        text="Sample bio text goes here."
        Icon={AccountCircleIcon}
      />
      <ProfileCard heading="Username" text="@Janedeo" Icon={PersonIcon} />
      <ProfileCard heading="Name" text="Jane Doe" Icon={BadgeIcon} />
      <ProfileCard
        heading="joined "
        text={moment("2021-07-15T13:45:30").fromNow()}
        Icon={CalendarTodayIcon}
      />
    </Stack>
  );
};

export default Profile;

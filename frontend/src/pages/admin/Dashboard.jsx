/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AdminLayout from "../../components/layout/AdminLayout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import moment from "moment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import { DoughnutChart, LineChart } from "../../components/specific/charts";
import zIndex from "@mui/material/styles/zIndex";
import { useDashboardStatsQuery } from "../../redux/api/adminApi/adminapi";

const Dashboard = () => {
  const { data, isLoading, isError, isFetching, error } =
    useDashboardStatsQuery();

  const { stats } = data || {};

  if (isError) {
    return (
      <Container>
        <Typography variant="h1">Error occured : ${error.message}</Typography>
      </Container>
    );
  }
  const Widgets = ({ title, value, Icon }) => {
    return (
      <Paper
        elevation={3}
        spacing={2}
        sx={{
          padding: "1rem",
          borderRadius: "1rem",
          width: "100%",
          maxWidth: "80vmax",
          height: "25vmin",
        }}
      >
        <Stack>
          <Typography>{value}</Typography>
          <Stack>
            <Icon fontSize="large" />
            <Typography>{title}</Typography>
          </Stack>
        </Stack>
      </Paper>
    );
  };
  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "1rem",
        borderRadius: "1rem",
        margin: "1.5rem 0",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <AdminPanelSettingsIcon fontSize="large" />
        <TextField
          type="search"
          size="small"
          label="Search field"
          placeholder="Search..."
        />
        <Button variant="contained">Seach</Button>
        <Box sx={{ flexGrow: 1 }} />
        <Typography
          sx={{
            color: "gray",
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          {moment().format("lll")}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );

  const Widget = (
    <Stack
      spacing={2}
      justifyContent={"space-between"}
      alignItems={"center"}
      direction={{
        xs: "column",
        sm: "row",
      }}
      margin={"2rem 0"}
    >
      <Widgets title="users" value={stats?.usersCount} Icon={PersonIcon} />
      <Widgets title="Chats" value={stats?.totalChatsCount} Icon={GroupsIcon} />
      <Widgets
        title="messages"
        value={stats?.messagesCount}
        Icon={MessageIcon}
      />
    </Stack>
  );
  return isLoading || isFetching ? (
    <p>loading....</p>
  ) : (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}
        <Stack gap={5} direction={"row"} spacing={2} flexWrap={"wrap"}>
          <Paper
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "80vmax",
              height: "auto",
            }}
          >
            <Typography>Last Messages</Typography>
            <LineChart value={stats?.messages} />
          </Paper>
          <Paper
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              maxWidth: "25vmax",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: {
                xs: "100%",
                md: "50%",
              },
              position: "relative",
            }}
          >
            <DoughnutChart
              style={{ zIndex: 100 }}
              labels={["sinlge chats", "groups chats"]}
              value={[
                stats?.totalChatsCount - stats?.groupsCount || 0,
                stats?.groupsCount || 0,
              ]}
            />

            <Stack
              position={"absolute"}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"100%"}
              height={"100%"}
              spacing={"0.5rem"}
            >
              <GroupsIcon /> <Typography>Vs</Typography> <PersonIcon />
            </Stack>
          </Paper>
        </Stack>
        {Widget}
      </Container>
    </AdminLayout>
  );
};

export default Dashboard;

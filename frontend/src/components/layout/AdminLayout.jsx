import {
  Box,
  Drawer,
  Grid2,
  IconButton,
  Menu,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useLocation } from "react-router";
// import { Link } from "../styles/styledComponents";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link as LinkComponent } from "react-router";

const Link = styled(LinkComponent)({
  textDecoration: "none",
  borderRadius: "2rem",
  color: "black",
  padding: "1rem 2rem",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});

export const adminTab = [
  {
    name: "Dashboard",
    link: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    link: "/admin/users-management",
    icon: <PeopleIcon />,
  },
  {
    name: "Chats",
    link: "/admin/chats-managemnet",
    icon: <GroupsIcon />,
  },
  {
    name: "messages",
    link: "/admin/messages-managemnet",
    icon: <GroupsIcon />,
  },
];

const Sidebar = ({ w = "50vw" }) => {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <Stack width={w} direction={"column"} padding={"3rem"}>
        <Typography variant="h5">Admin Dashboard</Typography>
      </Stack>
      <Stack spacing={"1rem"}>
        {adminTab.map((tab) => (
          <Link key={tab.name} to={tab.link}>
            <Stack
              direction={"row"}
              spacing={"1rem"}
              alignItems={"center"}
              padding={"1rem"}
              bgcolor={location.pathname === tab.link ? "lightgray" : ""}
            >
              {tab.icon}
              <Typography>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}
      </Stack>
    </>
  );
};

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };
  return (
    <Grid2 container sx={{ height: "100vh" }}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: "1rem",
          right: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Grid2
        size={{ md: 4, lg: 3 }}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <Sidebar />
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 8, lg: 9 }}
        sx={{ padding: "2rem" }}
        bgcolor="lightgray"
      >
        {children}
      </Grid2>
      {isMobile && (
        <Drawer
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
          }}
          anchor="right"
          open={isMobile}
          onClose={handleMobile}
        >
          {isMobile && (
            <IconButton
              sx={{ position: "fixed", top: "1rem", right: "1rem" }}
              onClick={handleMobile}
            >
              <CloseIcon />
            </IconButton>
          )}
          <Sidebar width="50vw" />
        </Drawer>
      )}
    </Grid2>
  );
};

export default AdminLayout;

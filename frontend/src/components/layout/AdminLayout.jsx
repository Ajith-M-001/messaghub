/* eslint-disable react/prop-types */
import {
  Box,
  Drawer,
  Grid2,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Link as LinkComponent, Navigate, useLocation } from "react-router";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import MessageIcon from "@mui/icons-material/Message";
import LogoutIcon from "@mui/icons-material/Logout";

const Link = styled(LinkComponent)({
  textDecoration: "none",
  color: "black",
  padding: "0.2rem",
});

const ADMIN_MENU = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: DashboardIcon,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: PeopleAltIcon,
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: GroupsIcon,
  },
  {
    name: "messages",
    path: "/admin/messages",
    icon: MessageIcon,
  },
];

const isAdmin = true;

const Sidebar = ({ width = "100%" }) => {
  const location = useLocation();

  const logoutHandler = () => {
    alert("Logout");
  };

  return (
    <Stack width={width} direction={"column"} p={"1.2rem"} spacing={"1rem"}>
      <Typography textAlign={"center"} variant="h6" textTransform={"uppercase"}>
        Admin Dashboard
      </Typography>
      <Stack>
        {ADMIN_MENU.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link to={item.path} key={item.name}>
              <Stack
                direction={"row"}
                spacing={"1rem"}
                alignItems={"center"}
                sx={{
                  backgroundColor: isActive ? "rgba(0,0,0,0.1)" : "transparent",
                  color: "black",
                  borderRadius: "2rem",
                  padding: "1rem",
                  transition: "background-color 0.3s ease-out",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Icon />
                <Typography>{item.name}</Typography>
              </Stack>
            </Link>
          );
        })}
        <Link onClick={logoutHandler}>
          <Stack
            direction={"row"}
            spacing={"1rem"}
            alignItems={"center"}
            sx={{
              backgroundColor: "transparent",
              color: "black",
              borderRadius: "2rem",
              padding: "1rem",
              transition: "background-color 0.3s ease-out",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.1)",
              },
            }}
          >
            <LogoutIcon />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };

  if (!isAdmin) return <Navigate to="/admin" />;
  return (
    <>
      <Grid2 direction={"row"} container sx={{ height: "100vh" }}>
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            top: "2.3rem",
            right: "2rem",
          }}
        >
          <IconButton onClick={handleMobile}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Grid2
          size={{ md: 3, lg: 4 }}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <Sidebar />
        </Grid2>

        <Grid2
          size={{ xs: 12, md: 9, lg: 8 }}
          sx={{
            overflow: "auto",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.1)",
          }}
        >
          {children}
        </Grid2>
      </Grid2>
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
        <IconButton
          onClick={handleMobile}
          sx={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            display: {
              xs: "block",
              md: "none",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Sidebar width="50vw" />
      </Drawer>
    </>
  );
};

export default AdminLayout;

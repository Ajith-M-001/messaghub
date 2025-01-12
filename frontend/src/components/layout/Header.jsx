/* eslint-disable react/prop-types */
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Backdrop,
  Badge,
} from "@mui/material";
import { Link, useNavigate } from "react-router"; // For routing (optional)
import { orange } from "../constants/color";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { lazy, Suspense, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { userNotExists } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMisc,
  setIsMobile,
  setIsNotification,
  setIsSearch,
} from "../../redux/slices/misc";
import { resetNotification, selectchat } from "../../redux/slices/chat";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationsDialog = lazy(() => import("../specific/Notifictions"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification } = useSelector(selectMisc);
  const { notificationCount } = useSelector(selectchat);

  console.log("asdfsdafdsa", notificationCount);

  const [isNewGroup, setIsNewGroup] = useState(false);

  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };

  const openNotifications = () => {
    dispatch(resetNotification());
    dispatch(setIsNotification(true));
  };

  const LogoutHandler = async () => {
    console.log("Logout");
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        navigate("/login");
        toast.success(response.data.message);
        dispatch(userNotExists());
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const openSearchDialog = () => {
    dispatch(setIsSearch(true));
  };

  const openNewGround = () => {
    setIsNewGroup((prev) => !prev);
  };

  const navigateToGroup = () => {
    navigate("/group");
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height="4rem">
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                MessageHup
              </Link>
            </Typography>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuOpenIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn
                icon={<SearchIcon />}
                title="search"
                onClick={openSearchDialog}
              />
              <IconBtn
                icon={<AddIcon />}
                title="New Group"
                onClick={openNewGround}
              />
              <IconBtn
                icon={<GroupsIcon />}
                title="manage groups"
                onClick={navigateToGroup}
              />
              <IconBtn
                icon={<NotificationsIcon />}
                title="notifications"
                onClick={openNotifications}
                value={notificationCount}
              />
              <IconBtn
                icon={<LogoutIcon />}
                title="logout"
                onClick={LogoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open={true} />}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open={true} />}>
          <NotificationsDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open={true} />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ icon, title, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge color="error" badgeContent={value}>
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;

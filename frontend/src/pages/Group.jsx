import { Drawer, Grid2, IconButton, Tooltip } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const Group = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const naviagateBack = () => {
    navigate("/");
  };

  const handleMobileClose = () => {
    setIsMobile(false);
  };

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };
  const IconsBtn = (
    <>
      <IconButton
        onClick={handleMobile}
        sx={{
          position: "absolute",
          right: "2rem",
          top: "2rem",
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Tooltip title="back">
        <IconButton
          onClick={naviagateBack}
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "rgba(0,0,0,0.8)",
            color: "white",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.7)", // Fixed the hover style
            },
          }}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );
  return (
    <Grid2 bgcolor={"rgba(0,0,0,0.1)"} container height={"100vh"}>
      <Grid2
        bgcolor={"bisque"}
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        size={{ sm: 4 }}
      >
        Groups List
      </Grid2>
      <Grid2
        size={{ xs: 12, sm: 8 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconsBtn}
      </Grid2>
      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobile}
        onClose={handleMobileClose}
      >
        Group List
      </Drawer>
    </Grid2>
  );
};

export default Group;

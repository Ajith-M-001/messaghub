import { Box, Drawer, Grid2, IconButton, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const Sidebar = () => {
  return <Box>side bar asdfadsfdasfasdfdas</Box>;
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
        <Drawer anchor="right" open={isMobile} onClose={handleMobile}>
          {isMobile && (
            <IconButton
              sx={{ position: "fixed", top: "1rem", right: "1rem" }}
              onClick={handleMobile}
            >
              <CloseIcon />
            </IconButton>
          )}
          <Sidebar />
        </Drawer>
      )}
    </Grid2>
  );
};

export default AdminLayout;

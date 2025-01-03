import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import { orange } from "../constants/color";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: orange,
        color: "white",
        py: 3,
        height: "4rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="body2">
            © {currentYear} MessageHup. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

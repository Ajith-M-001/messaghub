import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { VisuallyHiddenInput } from "../components/styles/styledComponents";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("login data:", loginData);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("register data:", registerData);
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setRegisterData((prev) => ({
      ...prev,
      avatar: file,
    }));
  };

  return (
    <Container
      component={"main"}
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form onSubmit={handleLoginSubmit}>
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                name="username"
                value={loginData.username}
                onChange={handleLoginChange}
              />
              <TextField
                required
                fullWidth
                label="password"
                type="password"
                margin="normal"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                variant="outlined"
              />
              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Login
              </Button>
              <Typography sx={{ marginTop: "1rem", textAlign: "center" }}>
                or
              </Typography>
              <Button
                type="button"
                onClick={() => setIsLogin(false)}
                fullWidth
                variant="text"
                sx={{ marginTop: "1rem" }}
              >
                sign up instead
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Sign Up</Typography>
            <form
              onSubmit={handleRegisterSubmit}
              style={{ width: "100%", marginTop: "1rem" }}
            >
              <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                <Avatar
                  sx={{ width: "10rem", height: "10rem", objectFit: "contain" }}
                  src={
                    registerData.avatar
                      ? URL.createObjectURL(registerData.avatar)
                      : undefined
                  }
                />
                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    color: "white",
                    bgcolor: "rgba(0,0,0,0.5)",
                    hover: "rgba(0,0,0,0.7)",
                  }}
                >
                  <>
                    <CameraAltIcon />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleAvatarChange}
                      accept="image/*"
                    />
                  </>
                </IconButton>
              </Stack>
              <TextField
                required
                fullWidth
                label="Full name"
                margin="normal"
                name="fullName"
                variant="outlined"
                value={registerData.fullName}
                onChange={handleRegisterChange}
              />
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                name="username"
                value={registerData.username}
                onChange={handleRegisterChange}
              />
              <TextField
                required
                fullWidth
                label="email"
                margin="normal"
                variant="outlined"
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
              />
              <TextField
                required
                fullWidth
                label="password"
                type="password"
                margin="normal"
                variant="outlined"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
              />
              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                sign Up
              </Button>
              <Typography sx={{ marginTop: "1rem", textAlign: "center" }}>
                or
              </Typography>
              <Button
                type="button"
                onClick={() => setIsLogin(true)}
                fullWidth
                variant="text"
                sx={{ marginTop: "1rem" }}
              >
                Login in instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;

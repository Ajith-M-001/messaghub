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
import axios from "axios";
import { userLogin } from "../components/constants/config";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/slices/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: "",
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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    try {
      const response = await axios.post(userLogin, loginData, config);
      console.log(response);
      if (response.data.success === true) {
        console.log("inside if");
        dispatch(userExists(response.data.user));
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/user/new`,
        registerData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data.success === true) {
        console.log("inside if asd");
        navigate("/login");
        setRegisterData({
          name: "",
          username: "",
          email: "",
          password: "",
          avatar: null,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
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
                label="name"
                margin="normal"
                name="name"
                variant="outlined"
                value={registerData.name}
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

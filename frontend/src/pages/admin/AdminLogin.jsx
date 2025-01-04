import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router";

const isAdmin = true;

const AdminLogin = () => {
  const [adminLoginData, setAdminLoginData] = useState({
    secretKet: "",
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("login data:", adminLoginData);
  };

  const handleAdminLoginChange = (e) => {
    const { name, value } = e.target;
    setAdminLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if(isAdmin) return <Navigate to="/admin/dashboard" />
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h5">Admin Login</Typography>
      <form onSubmit={handleLoginSubmit}>
        <TextField
          required
          fullWidth
          label="secret key"
          type="password"
          margin="normal"
          name="secretKet"
          value={adminLoginData.secretKet}
          onChange={handleAdminLoginChange}
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
      </form>
    </Container>
  );
};

export default AdminLogin;

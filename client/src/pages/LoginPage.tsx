import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import googleIcon from "../assets/google_icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Tilt from "react-parallax-tilt";
import "../styles/loginpage.styles.scss";
import useGetUser from "../hooks/useGetUser";

const LoginPage = () => {
  const googleAuth = () => {
    window.open("http://localhost:8080/login/federated/google", "_self");
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await axios.post("/login/password", user);
      console.log(response);
      toast.success("Logged in successfully!");
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isUserLoggedIn = useGetUser();
  if (isUserLoggedIn) navigate("/home");

  return (
    <Box
      className="login-container"
      sx={{
        height: "100vh",
        width: 1,
        // bgcolor: "black",
        // color: "white",
      }}
    >
      <Box
        sx={{
          height: 1,
          width: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* bgcolor: "#16171C" */}
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
          <Stack
            direction="column"
            gap={2}
            sx={{
              p: 8,
              // border: 1,
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderRadius: 6,
              // bgcolor: "white",
              bgcolor: "#16171C",
              color: "white",
            }}
          >
            <form onSubmit={handleUpload}>
              <Stack direction="column" gap={2} sx={{ width: "350px" }}>
                <Typography variant="h4">Login User</Typography>
                <TextField
                  // color="secondary"
                  className="login-input-fields"
                  placeholder="Email"
                  variant="outlined"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
                <TextField
                  // color="secondary"
                  className="login-input-fields"
                  placeholder="Password"
                  variant="outlined"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
                <Button type="submit">Login</Button>
              </Stack>
            </form>
            <Typography
              variant="body1"
              textAlign="center"
              sx={{
                color: "white",
              }}
            >
              Don't have any account?
              <Link to="/signup" className="signup-link">
                <span>Signup</span>
              </Link>
            </Typography>

            <Divider
              sx={{
                color: "#ABAFB4",
                "&::before, &::after": {
                  borderColor: "#ABAFB4",
                },
              }}
            >
              OR
            </Divider>
            <Stack direction="row" justifyContent="center">
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                gap={2}
                sx={{
                  borderRadius: 50,
                  width: 1,
                  // maxWidth: "250px",
                  color: "white",
                  // bgcolor: "#393C3F",
                  bgcolor: "#111111",
                  p: 1,
                  "&:hover": { cursor: "pointer", bgcolor: "#393C3F" },
                  // "&:active": { transform: "scale(1.05)" },
                }}
                component={Paper}
                elevation={1}
                onClick={googleAuth}
              >
                <img src={googleIcon} alt="" width="50px" height="50px" />
                <Typography variant="h6">Login with google</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Tilt>
      </Box>
    </Box>
  );
};

export default LoginPage;

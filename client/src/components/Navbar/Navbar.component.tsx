import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useGetUser from "../../hooks/useGetUser";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const user = useGetUser();

  const handleLogOut = async () => {
    try {
      const res = await axios.post("/logout");
      console.log(res);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bhola Cabs
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome - {user?.username}
          </Typography>
          <Button onClick={handleLogOut}>Log out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

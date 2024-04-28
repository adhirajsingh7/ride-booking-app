import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const UserProfilePage = () => {
  const [user, setUser] = useState<IUserProfile>();
  useEffect(() => {
    const getUserDetails = async () => {
      const res = await axios.get("/users/65ec61af6e8b6c50a34af03d");
      setUser(res.data);
      console.log(res.data);
    };
    getUserDetails();
  }, []);

  return (
    <Box>
      <Typography variant="h4">UserProfilePage</Typography>
      <img src={user?.avatar} height="300px" width="300px" alt="" />
      <Typography variant="body1">_id - {user?._id}</Typography>
      <Typography variant="body1">username - {user?.username}</Typography>
      <Typography variant="body1">email - {user?.email}</Typography>
      <Typography variant="body1">password - {user?.password}</Typography>
      <Typography variant="body1">full_name - {user?.full_name}</Typography>
    </Box>
  );
};

export default UserProfilePage;

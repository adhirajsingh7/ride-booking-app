import { Box } from "@mui/material";
import React from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const LoaderComponent = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#2b4162",
        backgroundImage: "linear-gradient(315deg, #2b4162 0%, #12100e 74%)",
      }}
    >
      <ClimbingBoxLoader size={50} color="#FE6D87" />
    </Box>
  );
};

export default LoaderComponent;

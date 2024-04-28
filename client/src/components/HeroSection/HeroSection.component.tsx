import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import HeroSectionImage from "../../assets/images/Ride-with-Uber.jpg";
import { useNavigate } from "react-router-dom";

const HeroSectionComponent = () => {
  const navigate = useNavigate();
  const handleSeePrices = () => {};

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        width: "100%",
        bgcolor: "black",
        color: "white",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={5}
        sx={{ height: 1, width: 1 }}
      >
        <Stack direction="column" gap={2}>
          <Typography variant="h2" sx={{ width: "350px", fontWeight: 600 }}>
            Go anywhere with Bhola Cabs
          </Typography>
          <Typography variant="body1">
            Request a ride, hop in, and go.
          </Typography>
          <Button onClick={handleSeePrices}> See prices</Button>
        </Stack>
        <img src={HeroSectionImage} alt="" />
      </Stack>
    </Box>
  );
};

export default HeroSectionComponent;

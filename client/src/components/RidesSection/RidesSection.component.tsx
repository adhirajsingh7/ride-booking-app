import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RidesCardComponent from "../RidesCard/RidesCard.component";
import axios from "axios";

const RidesSectionComponent = () => {
  const [availableRides, setAvailableRides] = useState([]);

  // useEffect(() => {
  //   const getAvailableRides = async () => {
  //     try {
  //       const res = await axios.get("/cars");
  //       // console.log(res.data);
  //       setAvailableRides(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getAvailableRides();
  // }, []);

  return (
    <Box sx={{ height: "100vh", width: 1 }}>
      <Typography variant="h3" textAlign="center" sx={{ p: 2 }}>
        Book your ride
      </Typography>
      <Stack direction="row" gap={2}>
        {availableRides?.map((ride, key) => (
          <RidesCardComponent key={key} {...ride} />
        ))}
      </Stack>
    </Box>
  );
};

export default RidesSectionComponent;

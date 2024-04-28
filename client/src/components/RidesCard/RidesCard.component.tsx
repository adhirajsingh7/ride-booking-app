import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./RidesCard.style.scss";

const RidesCardComponent = (rideDetails: any) => {
  // const navigate = useNavigate();
  const {
    _id: car_id,
    image,
    brand,
    model,
    airbags,
    seats_available,
    owner_id: owner_details,
  } = rideDetails;
  // console.log(rideDetails);
  console.log(owner_details);
  // const handleBookRide = ()=>{
  //   navigate(`/bookride/${car_id}`)
  // }

  return (
    <Stack direction="column" gap={2} className="ride-card-container">
      <img src={image} alt="" />
      <Stack direction="column" gap={1}>
        <Typography variant="body1">
          {brand} - {model}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Button size="small" sx={{ width: "100px" }}>
          Details
        </Button>
        <Button size="small" sx={{ width: "100px" }}>
          Book ride
        </Button>
      </Stack>
    </Stack>
  );
};

export default RidesCardComponent;

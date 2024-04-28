import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import axios from "axios";

const BookRide = () => {
  const [bookRide, setBookRide] = useState({
    pickup_location: "",
    drop_off_location: "",
    car_details: "objectId",
    rider_details: "objectId",
    // user_details: "objectId",
    fare: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useGetUser();
  const params = useParams();

  // console.log(params);

  console.log(user);
  // const [user, setUser] = useState({});
  useEffect(() => {
    const getRideDetails = async () => {
      try {
        const response = await axios.get(`/cars/${params.car_id}`);
        setBookRide((prev) => ({
          ...prev,
          car_details: params?.car_id || "",
          rider_details: response.data.owner_id,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    getRideDetails();
  }, []);

  const hanldeBookRide = async (e) => {
    e.preventDefault();
    console.log(bookRide);
    try {
      setLoading(true);
      const response = await axios.post(`/book-ride/${user._id}`, bookRide);
      setLoading(false);
      console.log(response);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setBookRide((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <Box
      sx={{
        height: "100vh",
        width: 1,
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
        <Stack direction="column" gap={2}>
          <form onSubmit={hanldeBookRide} encType="multipart/form-data">
            <Stack direction="column" gap={2} sx={{ width: "350px" }}>
              <Typography variant="h3">Book your ride</Typography>
              <TextField
                label="Pickup location"
                variant="outlined"
                name="pickup_location"
                value={bookRide.pickup_location}
                onChange={handleChange}
              />
              <TextField
                label="Dropoff location"
                variant="outlined"
                name="drop_off_location"
                value={bookRide.drop_off_location}
                onChange={handleChange}
              />
              <TextField
                type="number"
                label="Fare"
                variant="outlined"
                name="fare"
                value={bookRide.fare}
                onChange={handleChange}
              />
              <Button disabled={loading} type="submit">
                Book ride
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Box>
  );
};

export default BookRide;

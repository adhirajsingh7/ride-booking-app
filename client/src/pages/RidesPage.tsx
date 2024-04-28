import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RidesCardComponent from "../components/RidesCard/RidesCard.component";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { decrement, increment } from "../features/counter/counter.slice";

const RidesPage = () => {
  const count = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  console.log(count);

  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  useEffect(() => {
    const getCars = async () => {
      try {
        const response = await axios.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCars();
  }, []);

  return (
    <>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      <IconButton onClick={() => navigate("/home")}>
        <ArrowBackIcon />
      </IconButton>
      <Box sx={{ height: "calc(100% - 40px)", width: 1 }}>
        <Typography variant="h6">Cars list</Typography>
        <Stack direction="row" gap={2}>
          {cars?.map((car, item) => (
            <RidesCardComponent key={item} {...car} />
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default RidesPage;

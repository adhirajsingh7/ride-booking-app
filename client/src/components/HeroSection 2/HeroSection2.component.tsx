import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import HeroSection2Image from "../../assets/images/hero-section-2.jpg";
import { Link } from "react-router-dom";

const HeroSection2Component = (props: any) => {
  const { user } = props;
  return (
    <Box
      sx={{
        height: "calc(100vh - 112px)",
        width: 1,
        py: 7,
        px: 4,
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Box sx={{ height: 1, width: 1 }}>
        <img
          src={HeroSection2Image}
          alt=""
          style={{ height: "100%", width: "100%", objectFit: "contain" }}
        />
      </Box>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          height: 1,
          width: 1 / 2,
        }}
      >
        <Stack direction="column" gap={4}>
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            Drive when you want, make what you need
          </Typography>
          <Typography variant="body1">
            Make money on your schedule with deliveries or rides—or both. You
            can use your own car or choose a rental through Uber.
          </Typography>
          <Stack direction="row" gap={2}>
            {/* <Button color="success" sx={{ width: "200px" }}>
              Get started
            </Button> */}
            <Link to={`/registercar/${user?._id}`}>
              <Button>register your car</Button>
            </Link>
            <Link to={"/rides"}>
              <Button>See all rides</Button>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default HeroSection2Component;

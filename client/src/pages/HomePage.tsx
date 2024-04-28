import NavbarComponent from "../components/Navbar/Navbar.component";
import HeroSectionComponent from "../components/HeroSection/HeroSection.component";
import RidesSectionComponent from "../components/RidesSection/RidesSection.component";
import { Footer } from "../components/Footer";
import useGetUser from "../hooks/useGetUser";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import HeroSection2Component from "../components/HeroSection 2/HeroSection2.component";

const HomePage = () => {
  const user = useGetUser();
  console.log(user);

  return (
    <>
      <NavbarComponent />
      <HeroSectionComponent />
      {/* <Link to={`/registercar/${user?._id}`}>
        <Button>register your car</Button>
      </Link> */}
      {/* <RidesSectionComponent /> */}
      <HeroSection2Component user={user} />

      <Footer />
    </>
  );
};

export default HomePage;

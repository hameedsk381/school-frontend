import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";

import banner from "../assets/banner.JPG";
import Marquee from "react-fast-marquee";

import Message from "./Message";
import Alumni from "./Alumni";
import Menulist from "./Menulist";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Values from "./Values";
import { Parallax } from "react-parallax";
import Footer from "./Footer";

import Swal from "sweetalert2";
import Eventscomp from "./Eventscomp";
import Events from "./EventsPanel";
import AnnouncementPanel from "./AnnouncementPanel";
import { Link } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

const arrayRange = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );
  
const Home = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Grid
        container
        sx={{
          display: { xs: "block", md: "flex" },
        
        }}
      >
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            maxHeight: { xs: "100vh", md: "60vh" },
          }}
        >
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all 1s"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            itemClass="carousel-item-padding-80-px"
          >
            {arrayRange(1, 17, 1).map((item, i) => (
              <div className="relative" key={i}>
                <img
                  src={require(`../banner/ban${item}.JPG`)}
                  className="max-h-[100vh] object-cover md:h-[60vh] h-[200px] w-[100%]  img-fluid"
                  alt="logo"
                  onClick={() => {
                    Swal.fire({
                      imageUrl: `${require(`../assets/IMG_${item}.JPG`)}`,
                      imageHeight: "50vh",
                      imageWidth: "100vw",
                      imageAlt: "A tall image",
                    });
                  }}
                />
              </div>
            ))}
          </Carousel>
        </Grid>
        <Grid item xs={12} md={3} component={Card} elevation={0} p={3} >
      <AnnouncementPanel/>
      <Button component={Link} variant='contained' size="small" sx={{m:4}}   to='/announcements'>View all announcements <ArrowForward sx={{mx:1}} fontSize="inherit"/></Button>
        </Grid>
        </Grid>
        <Values />

        <div className="container mx-auto px-4 py-8 md:py-16 ">
          <h3 className="text-2xl md:text-4xl font-bold  mb-4 md:mb-8" style={{color:"#2196f3"}}>
            What We Offer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className=" rounded-lg shadow-2xl  p-8" style={{backgroundColor:"#2196f3"}}>
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.293 3.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 6.414V15a1 1 0 01-2 0V6.414L3.707 10.707a1 1 0 01-1.414-1.414l6-6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="text-lg md:text-xl font-bold mt-4 text-white">
                Quality Education
              </h4>
              <p className="text-white mt-2 font-sans">
                Our teachers and staff are dedicated to providing a high-quality
                education to our students, and we're committed to continuous
                improvement.
              </p>
            </div>
            <div className="rounded-lg shadow-2xl  p-8" style={{backgroundColor:"#2196f3"}}>
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.707 6.707a1 1 0 011.414 0L10 8.586l1.879-1.88a1 1 0 011.414 1.415l-2.586 2.586a1 1 0 01-1.414 0L8.586 9.414 6.707 7.536a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M6.707 10.121a1 1 0 011.414 0L10 12l1.879-1.879a1 1 0 011.414 1.414l-2.586 2.586a1 1 0 01-1.414 0L8.586 13.414 6.707 11.536a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M3.879 3.879a1 1 0 011.414 0L8 6.586l1.879-1.88a1 1 0 011.414 1.415L8.414 8l2.586 2.586a1 1 0 01-1.414 1.414L7 9.414l-1.879 1.879a1 1 0 01-1.414-1.414L5.586 8 3.879 6.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M9.707 14.707a1 1 0 01-1.414 0L6 11.414l-1.879 1.879a1 1 0 01-1.414-1.414l2.586-2.586a1 1 0 011.414 0L8 9.586l2.879-2.879a1 1 0 011.414 1.414L9.414 11l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="text-lg md:text-xl font-bold mt-4 text-white">
                Enriching Clubs
              </h4>
              <p className="text-white mt-2 font-sans">
                Our school offers a wide range of enriching clubs and activities
                to help our students discover and develop their passions and
                interests.
              </p>
            </div>
            <div className="rounded-lg shadow-2xl  p-8" style={{backgroundColor:"#2196f3"}}>
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 011 1v1h1a1 1 0 110 2H9v1a1 1 0 11-2 0V6H6a1 1 0 110-2h1V3a1 1 0 011-1zM6 14a1 1 0 011-1v-1h1a1 1 0 110 2H8v1a1 1 0 11-2 0v-1H6a1 1 0 01-1-1zM14 6a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V9h-1a1 1 0 01-1-1V7a1 1 0 011-1zM10 14a1 1 0 011-1v-1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H10z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="text-lg md:text-xl font-bold mt-4 text-white">
                Excellent Faculty
              </h4>
              <p className="text-white mt-2 font-sans">
                Our experienced and dedicated faculty are committed to providing
                a supportive and engaging learning environment for all of our
                students.
              </p>
            </div>
          </div>
        </div>
        <Parallax blur={3} bgImage={banner} bgImageAlt="banner" strength={300}>
          <Box sx={{ height: { xs: 200, md: 350, lg: 500 }, width: "100vw" }}>
            <Stack
              sx={{ width: "100%", height: "100%", justifyContent: "center" }}
            >
              <Typography
                color={"InfoBackground"}
                sx={{
                  margin: "auto",
                  my: 0,
                  textTransform: "uppercase",
                  stroke: "black",
                  fontSize: { xs: 20, md: 60 },
                }}
                fontWeight={"bold"}
              >
                {" "}
                Creating a{" "}
                <Typography
                  fontWeight={"bold"}
                  sx={{
                    color: "#0096ff",
                    display: "inline-flex",
                    fontSize: { xs: 20, md: 60 },
                  }}
                >
                  {" "}
                  SOLIDITY OF PURPOSE
                </Typography>
              </Typography>
              <Typography
                color={"InfoBackground"}
                sx={{
                  margin: "auto",
                  my: 0,
                  textTransform: "uppercase",
                  stroke: "black",
                  fontSize: { xs: 20, md: 60 },
                }}
                fontWeight={"bold"}
              >
                {" "}
                and{" "}
                <Typography
                  fontWeight={"bold"}
                  sx={{
                    color: "#0096ff",
                    display: "inline-flex",
                    fontSize: { xs: 20, md: 60 },
                  }}
                >
                  STRENGTH OF CHARACTER
                </Typography>
              </Typography>
            </Stack>
          </Box>
        </Parallax>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            maxHeight: { xs: "100%" },
            backgroundColor: "#2196f3",
            py: 4,
            px: 4,
            borderBlock: "1px solid white",
          }}
        >
          <Message
            role="Correspondent"
            name="Fr. M Louis Raj"
            caption="Glory to God in the highest heaven and peace to his people on carth ~ Lk 2:14 "
            message={`"Christ the King E.M. High School, Christurajapuram, Vijayawada, is celebrating its Silver Jubilee. It is befitting to thank and praise the almighty God for his loving protection and providence all through the past twenty five years`}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            maxHeight: "100%",
            backgroundColor: "#2196f3",
            py: 4,
            px: 4,
            borderBlock: "1px solid white",
          }}
        >
          <Message
            role="Principal"
            name="Sr. Josephine (Lovely)"
            message={`A quarter of a century in perhaps a very short period in the vast expanse of time and space to rejoice over the silver jubilee of Christ the king school.

"Every tree is known known by the fruit it bears" LK 6:44.`}
          />
        </Grid>

        
        

        <Grid
          item
          xs={12}
          md={4}
          sx={{ backgroundColor: "#2196f3", borderBlock: "2px solid white" }}
        >
          <Menulist menu="About" bg={1509} route="about" />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ backgroundColor: "#2196f3", borderBlock: "2px solid white" }}
        >
          <Menulist menu="Faculty" bg={1512} route="faculty" />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ backgroundColor: "#2196f3", borderBlock: "2px solid white" }}
        >
          <Menulist menu="Gallery" bg={1516} route="gallery" />
        </Grid>
      
      <Footer />
    </>
  );
};

export default Home;

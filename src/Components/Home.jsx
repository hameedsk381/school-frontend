import { Box, Grid, Modal, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Announcements from "./Announcements";
import banner from "../assets/banner.JPG";
import Marquee from "react-fast-marquee";

import Message from "./Message";
import Alumni from "./Alumni";
import Menulist from "./Menulist";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Values from "./Values";
import {  Parallax } from "react-parallax";
import { useEffect } from "react";
import axios from "axios";
import principal from '../assets/principal.JPG'
import Footer from "./Footer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", lg: "50%" },
  bgcolor: "background.paper",

  boxShadow: 20,
  p: 2,
};
const arrayRange = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );
const Home = () => {
  const [img, setImg] = useState();
  const [open, setOpen] = useState(false);
  // const [pics, setpics] = useState([])

  const handleClose = () => setOpen(false);
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
// useEffect(() => {
//   axios.get("http://localhost:5000/api").then(res=>{
    
//     setpics(res.data)})
// }, [])

  return (
    <>
    <Grid
    container
    sx={{ display: { xs: "block", md: "flex" }, backgroundColor: "#2196f3" }}
  >
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <img src={img} alt="img" />
      </Box>
    </Modal>
    <Grid
      item
      xs={12}
      md={9}
      sx={{
        maxHeight: "100%",
        backgroundColor: "#2196f3",
        borderBlock: "1px solid #2196f3",
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
        { arrayRange(1455, 1544, 1).map((item, i) => (
          <div key={i}>
            <img
              src={require(`../assets/IMG_${item}.JPG`)}
              className="max-h-[600px] object-cover md:h-[590px] h-[200px] w-[100%]  img-fluid "
              loading="lazy"
              alt="logo"
              onClick={() => {
                setOpen(true);
                setImg(item);
              }}
            />
          </div>
        ))}
      </Carousel>
    </Grid>
    <Grid item xs={12} md={3} sx={{ maxHeight: "100%" }}>
      <Announcements
        title="Announcements"
        content="On the christmas eve celebrations to be held from 9:00 AM to 10:00 PM"
      />
      <Announcements
        title="Latest News"
        content="R16 Exam results are out check out here"
      />
    </Grid>

    <Values />
    <Parallax blur={3} bgImage={banner} bgImageAlt="banner" strength={300}>
      <Box sx={{ height: { xs: 200, md: 350, lg: 500 }, width: "100vw" }}>
        <Stack
          sx={{ width: "100%", height: "100%", justifyContent: "center" }}
        >
          <Typography
            color={"InfoBackground"}
            sx={{
              margin: "auto",
              my: 0,textTransform:"uppercase",
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
              my: 0,textTransform:"uppercase",
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
      sx={{
        display: {
          xs: "none",
          md: "flex",
          backgroundColor: "#2196f3",
          margin: "auto",
        },
      }}
    >
      <Marquee gradient={false}>
        <Alumni /> <Alumni />
      </Marquee>
    </Grid>
    <Grid
      item
      xs={12}
      sx={{
        display: {
          xs: "block",
          md: "none",
          backgroundColor: "#2196f3",
          margin: "auto",
        },
      }}
    >
      <Marquee gradient={false}>
        <Alumni /> <Alumni />
      </Marquee>
    </Grid>

    <Grid
      item
      xs={12}
      md={4}
      sx={{ backgroundColor: "#2196f3", borderBlock: "2px solid white" }}
    >
      <Menulist menu="About" bg={1512} route="about" />
    </Grid>
    <Grid
      item
      xs={12}
      md={4}
      sx={{ backgroundColor: "#2196f3", borderBlock: "2px solid white" }}
    >
      <Menulist menu="Faculty" bg={1515} route='faculty'/>
    </Grid>
    <Grid
      item
      xs={12}
      md={4}
      sx={{ backgroundColor: "#2196f3", borderBlock: "2px solid white" }}
    >
      <Menulist menu="Gallery" bg={1516} route="gallery" />
    </Grid>
  </Grid>
    <Footer />
    </>
   

  );
};

export default Home;

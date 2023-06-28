import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box,  Typography } from "@mui/material";
import REACT_API_URL from "../config";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

function Eventscomp() {
  const [eve, setEve] = useState([]);

  useEffect(() => {
    axios
      .get(`${REACT_API_URL}/events`)
      .then((response) => {
        setEve(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Marquee direction="left" speed={40} pauseOnHover={true}>
      {eve.map((eventt, index) => (
        <Box key={eventt._id} sx={{ px: 5 }}>
          <Typography
            sx={{
              ":hover": {
                color: "#2196f3",
                textDecorationLine: "underline",
                fontFamily: "cursive",
              },
            }}
            component={Link}
            to={`/event/${eventt._id}`}
          >
            {eventt.title}
          </Typography>
        </Box>
      ))}
    </Marquee>
  );
}

export default Eventscomp;

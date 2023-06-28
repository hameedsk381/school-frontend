import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import REACT_API_URL from "../config";
import Announcements from "./Announcements";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${REACT_API_URL}/announcements`);
        const { data } = response;
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Announcements announcements={events} />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Events;

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import REACT_API_URL from '../config';

const AlumniCard = styled(Card)({
  width: 300,
  margin: '0 10px',
});

const useStyles = {
  media: {
    height: 200,
  },
};

function AlumniFeedbackCards() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${REACT_API_URL}/alumni`);
        setFeedbackData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ display: 'flex', overflowX: 'scroll', py: 2 }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography>{error}</Typography>
      ) : (
        feedbackData.map((feedback) => (
          <AlumniCard key={feedback._id}>
            <CardActionArea>
              <CardMedia
               
                title={feedback.name}
                style={useStyles.media}
              >
              <Avatar src={`data:image/png;base64,${feedback.image}`} alt={feedback.name}/>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {feedback.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feedback.testimony}
                </Typography>
              </CardContent>
            </CardActionArea>
          </AlumniCard>
        ))
      )}
    </Box>
  );
}

export default AlumniFeedbackCards;

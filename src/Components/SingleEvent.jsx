import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,

  CircularProgress,
} from '@mui/material';
import logo from "../assets/logo2.png";
import { styled } from '@mui/system';

import REACT_API_URL from '../config';

const Root = styled(Card)({
  maxWidth: 800,
  margin: 'auto',
  marginTop: 4,
  marginBottom: 4,
});

const Title = styled(Typography)({
  margin:"auto",fontFamily:"cinzel"
});

const Content = styled(Typography)({
  whiteSpace: 'pre-wrap',
  marginBottom: 2
});

const Actions = styled(CardActions)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

function SingleEvent() {
  const [even, setEven] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${REACT_API_URL}/events/${id}`)
      .then(response => {
        setEven(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  if (!even) {
    return (
      <Box textAlign="center" m={10}>
        <CircularProgress/>
      </Box>
    );
  }

  return (
  <Box sx={{py:4,width:"100vw",height:"100vh",bgcolor:"#2196f3"}} >
  <Root  elevation={4} > 
  <Box
  component="img"
  src={logo}
  href="/"
  sx={{
    m: 2,
    display: { xs: "none", md: "flex" },
    width: {xs:"5%",md:'8%'},margin:"auto",my:2
  }}
/>
    <CardContent>
      <Box display="flex" alignItems="center">
        
        <Title variant="h5">{even.title}</Title>
      </Box>
      <Divider sx={{my:3}}/>
      <Content variant="body1">{even.description}</Content>
    </CardContent>
    <Actions>
      <Button component={Link} to="/">Back to Events</Button>
    
    </Actions>
  </Root>
  </Box>
  );
}

export default SingleEvent;

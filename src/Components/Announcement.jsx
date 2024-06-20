import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,

  CircularProgress,
  Paper,
  
} from '@mui/material';

import { styled } from '@mui/system';

import REACT_API_URL from '../config';
import { logos } from '../assets';
import { ArrowBack } from '@mui/icons-material';

const Root = styled(Card)({
  maxWidth: 800,
  margin: 'auto',
  marginTop: 4,
  marginBottom: 4,
});

const Title = styled(Typography)({
  margin:"auto",fontFamily:"cinzel",fontWeight:'bold'
});

const Content = styled(Typography)({
  whiteSpace: 'pre-wrap',
  marginBottom: 2,fontFamily:'sans-serif'
});


function Announcement() {
  const [announcement, setAnnouncement] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${REACT_API_URL}/announcements/${id}`)
      .then(response => {
        setAnnouncement(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  if (!announcement) {
    return (
      <Box textAlign="center" m={10}>
        <CircularProgress/>
      </Box>
    );
  }

  return (
  <Box sx={{mt:{xs:0,md:3}}} >
    
  <Root  elevation={4} sx={{bgcolor:'#2196f3'}} > 
  <Button color='inherit' variant='contained' size='small' sx={{m:3}} startIcon={<ArrowBack/>} component={Link} to="/announcements">Back to Announcements</Button>
  <Box
  component="img"
  src={logos.logo2}
  href="/"
  sx={{
    m: 2,
    display: { xs: "none", md: "flex" },
    width: {xs:"5%",md:'8%'},margin:"auto",my:2
  }}
/>

    <CardContent>
      <Box display="flex" alignItems="center">
        
        <Title variant="h5" color={'#ffffff'}>{announcement.title}</Title>
      </Box>
     
      <Paper elevation={4} sx={{p:2,mt:4}} variant='outlined'>
      <Content variant="body1">{announcement.description}</Content>
      </Paper>
      
    </CardContent>
    
  </Root>
  </Box>
  );
}

export default Announcement;

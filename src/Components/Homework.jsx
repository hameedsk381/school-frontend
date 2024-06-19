import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Breadcrumbs, CircularProgress, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Paper, Stack, Typography, Alert, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment'; 
import REACT_API_URL from '../config';
import HomeworkTable from './HomeworkTable';

const Homework = () => {
  const [homeworkData, setHomeworkData] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch homework data from API
  const fetchHomeworkData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${REACT_API_URL}/homework`);
      const { homework } = response.data;

      const filteredHomework = homework.filter(item => moment(item.expirationTime).isAfter(moment()));
      setHomeworkData(filteredHomework);

      if (filteredHomework.length > 0) {
        setSelectedClass(filteredHomework[0].classname);
      }
    } catch (error) {
      console.error('Failed to fetch homework data:', error);
      setError('Failed to fetch homework data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeworkData();
  }, []); // Only fetch data once on component mount

  // Handle class and section selection
  const handleClassSectionSelection = (classname) => {
    setSelectedClass(classname);
  };

  // Function to reload homework data
  const reloadHomeworkData = () => {
    fetchHomeworkData();
  };

  return (
    <Container>
      <Box>
        <Stack px={3} pt={3} sx={{ display: { xs: "block", md: "flex" } }}>
          <Box component="div" role="presentation">
            <Typography variant="h6">Homework</Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" to="/">
                Home
              </Link>
              <Typography sx={{ color: "#2196f3" }}>Homework</Typography>
            </Breadcrumbs>
          </Box>
        </Stack>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ my: 2 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        ) : homeworkData.length === 0 ? (
          <Box sx={{ my: 2 }}>
            <Alert severity="info">No homework for today</Alert>
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Paper variant="outlined" sx={{ border: '1px solid #2196f3', m: 3, pt: 2, bgcolor: '#2196f3', color: 'HighlightText' }}>
                <Typography variant="h6" sx={{ mx: 3, color: 'white', marginBottom: 2 }}>Classes and Sections</Typography>
                <List sx={{ bgcolor: 'white' }}>
                  {homeworkData.map(item => (
                    <ListItem
                      key={item._id}
                      disablePadding
                      sx={{
                        '&:hover': { bgcolor: '#f5f5f5', cursor: 'pointer' },
                        bgcolor: selectedClass === item.classname ? '#f5f5f5' : 'white',
                      }}
                      onClick={() => handleClassSectionSelection(item.classname)}
                    >
                      <ListItemButton>
                        <ListItemText primary={item.classname.name} sx={{ color: "#2196f3" }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={9}>
              <Paper variant="outlined" sx={{ m: 3, p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Selected Class and Section: {selectedClass ? selectedClass.name : 'None'}</Typography>
                <Divider sx={{ mb: 2 }} />
                <HomeworkTable classname={selectedClass ? selectedClass._id : null} />
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Homework;

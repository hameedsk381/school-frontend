import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
  Alert,
  Container,
  Button,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment'; 
import REACT_API_URL from '../config';
import HomeworkTable from './HomeworkTable';
import { ArrowForward } from '@mui/icons-material';

const Homework = () => {
  const [homeworkData, setHomeworkData] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleClick = () => {
    navigate('/materials');
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2}>
          <Box>
            <Typography variant="h4">Homework</Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" to="/">
                Home
              </Link>
              <Typography color="text.primary">Homework</Typography>
            </Breadcrumbs>
          </Box>
          <Button variant="contained" endIcon={<ArrowForward />} size="small" onClick={handleClick}>
            Resources Section
          </Button>
        </Stack>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        ) : homeworkData.length === 0 ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            No homework for today
          </Alert>
        ) : (
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={3}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" color="primary" mb={2}>
                  Classes and Sections
                </Typography>
                <List>
                  {homeworkData.map(item => (
                    <ListItem
                      key={item._id}
                      disablePadding
                      sx={{
                        '&:hover': { bgcolor: 'action.hover', cursor: 'pointer' },
                        bgcolor: selectedClass === item.classname ? 'action.selected' : 'inherit',
                      }}
                      onClick={() => handleClassSectionSelection(item.classname)}
                    >
                      <ListItemButton>
                        <ListItemText primary={item.classname.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={9}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" mb={2}>
                  Selected Class and Section: {selectedClass ? selectedClass.name : 'None'}
                </Typography>
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

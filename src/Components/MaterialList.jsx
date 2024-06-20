import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Snackbar,
  Alert,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  LinearProgress,
} from '@mui/material';
import { logos } from '../assets';
import MaterialCard from './MaterialCard';
import axios from 'axios';
import REACT_API_URL from '../config';
import Loader from './Loader';

const MaterialList = () => {
  const [materials, setMaterials] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [filterClass, setFilterClass] = useState('');
  const [filterSubject, setFilterSubject] = useState('');

  useEffect(() => {
    const abortController = new AbortController();

    const fetchClassesAndSubjects = async () => {
      try {
        setLoading(true);
        const [classesResponse, subjectsResponse] = await Promise.all([
          axios.get(`${REACT_API_URL}/api/classes`, { signal: abortController.signal }),
          axios.get(`${REACT_API_URL}/management/departments/list`, { signal: abortController.signal }), // Replace with your actual API endpoint
        ]);

        setClasses(classesResponse.data); // Assuming API returns an array of classes
        setSubjects(subjectsResponse.data); // Assuming API returns an array of subjects
        // Fetch materials
        const materialsResponse = await axios.get(`${REACT_API_URL}/material`, { signal: abortController.signal }); // Replace with your actual API endpoint
        setMaterials(materialsResponse.data); // Assuming API returns an array of materials
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.error('Failed to fetch data:', error);
          setError('Failed to fetch data. Please try again later.');
          setLoading(false);
        }
      }
    };

    fetchClassesAndSubjects();

    // Cleanup function to cancel the request if component unmounts
    return () => {
      abortController.abort();
    };
  }, []);

  const handleDownload = (materialId) => {
    // Implement download logic here
    console.log(`Download material with ID ${materialId}`);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Filtered materials based on selected filters
  const filteredMaterials = materials.filter((material) =>
    (!filterClass || material.class === filterClass) &&
    (!filterSubject || material.subject === filterSubject)
  );

  // Get unique options for filters
  const uniqueClasses = Array.from(new Set(classes.map((cls) => cls.name))); // Assuming 'name' property exists in classes data
  const uniqueSubjects = Array.from(new Set(subjects.map((subject) => subject))); // Assuming 'name' property exists in subjects data

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ py: { xs: 0, md: 4 } }}>
      <Grid item xs={12} md={8}>
        <Card variant="outlined" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', fontFamily: 'Roboto, sans-serif' }}>
          <CardContent>
            <Box
              component="img"
              src={logos.logo2}
              href="/"
              sx={{
                m: 'auto',
                width: { xs: "15%", md: "7%" },
              }}
            />
            <Typography
              my={2}
              textAlign='center'
              sx={{
                fontSize: {
                  xs: '1.5rem', // Font size for extra-small screens
                  md: '2.5rem', // Font size for medium screens and up
                },
              }}
            >
              CKS RESOURCES
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Filter by Class</InputLabel>
                  <Select
                    value={filterClass}
                    onChange={(e) => setFilterClass(e.target.value)}
                    label="Filter by Class"
                  >
                    <MenuItem value="">All</MenuItem>
                    {uniqueClasses.map((cls) => (
                      <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Filter by Subject</InputLabel>
                  <Select
                    value={filterSubject}
                    onChange={(e) => setFilterSubject(e.target.value)}
                    label="Filter by Subject"
                  >
                    <MenuItem value="">All</MenuItem>
                    {uniqueSubjects.map((subject) => (
                      <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            {loading ? (
      <Loader/>
            ) : filteredMaterials.length === 0 ? (
              <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
                No materials found.
              </Typography>
            ) : (
              <List>
                {filteredMaterials.map((material) => (
                  <MaterialCard key={material._id} material={material} handleDownload={handleDownload} />
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Material deleted successfully!"
      />
    </Grid>
  );
};

export default MaterialList;

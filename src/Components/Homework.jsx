import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Breadcrumbs,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import REACT_API_URL from '../config';
import HomeworkTable from './HomeworkTable';
import { Link } from 'react-router-dom';

const Homework = () => {
  const [homeworkData, setHomeworkData] = useState([]);
  const [selectedClass, setSelectedClass] = useState('UKG');
  const [selectedSection, setSelectedSection] = useState('A');

  const fetchHomeworkData = async () => {
    try {
      const response = await axios.get(`${REACT_API_URL}/homework`);
      const { homework } = response.data;
      setHomeworkData(homework);
    } catch (error) {
      console.error('Failed to fetch homework data:', error);
    }
  };

  useEffect(() => {
    fetchHomeworkData();
  }, []);

  const uniqueHomeworkData = homeworkData.reduce((acc, item) => {
    const key = `${item.classname}-${item.section}`;
    if (!acc[key]) {
      acc[key] = item;
    }
    return acc;
  }, {});

  const handleClassSectionSelection = (classname, section) => {
    setSelectedClass(classname);
    setSelectedSection(section);
  };

  return (
    <Box>
    <Stack px={3} pt={3} sx={{display:{xs:"block",md:"flex"}}}>
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
   <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Paper
          variant="outlined"
          sx={{
            border: '1px solid #2196f3',
            m: 3,
            pt: 2,
            bgcolor: '#2196f3',
            color: 'HighlightText',
          }}
        >
          <Typography
            variant="h6"
            sx={{ mx: 3, color: 'white', marginBottom: 2 }}
          >
            Classes and Sections
          </Typography>
          <List sx={{ bgcolor: 'white' }}>
            {Object.values(uniqueHomeworkData).map((item) => (
             
              <ListItem
                key={item._id}
                disablePadding
                sx={{
                  '&:hover': { bgcolor: '#f5f5f5', cursor: 'pointer' },
                  bgcolor:
                    selectedClass === item.classname &&
                    selectedSection === item.section
                      ? '#f5f5f5'
                      : 'white',
                }}
                onClick={() =>
                  handleClassSectionSelection(item.classname, item.section)
                }
              >
                <ListItemButton>
                  <ListItemText sx={{color:"#2196f3"}}
                    primary={`CLASS - ${item.classname} / SECTION - ${item.section}`}
                  />
                </ListItemButton>
              </ListItem>
            
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} md={9}>
        <Paper variant="outlined" sx={{ m: 3, p: 2 }}>
          {selectedClass && selectedSection ? (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Selected Class and Section:
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Class: {selectedClass}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Section: {selectedSection}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <HomeworkTable
                classname={selectedClass}
                section={selectedSection}
              />
            </>
          ) : (
            <Typography variant="h6">Please select a class and section</Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
    </Box>
    
  );
};

export default Homework;

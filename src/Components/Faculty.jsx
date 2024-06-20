import React, { useEffect, useState } from 'react';
import { Alert, Box, Breadcrumbs, CircularProgress, Container, Stack, Tab, Tabs, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import REACT_API_URL from '../config'; // Assuming you have your API URL configured here
import Facultypage from './Facultypage';
import { classeslist } from '../utils/classes';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Faculty = () => {
  const [value, setValue] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${REACT_API_URL}/management/departments/list`);
        setDepartments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch departments:', error);
        setLoading(false);
        setError(true);
      }
    };

    fetchDepartments();

    // Set timeout for 3 minutes (180000 ms)
    const timer = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError(true);
      }
    }, 180000); // 3 minutes

    // Cleanup timeout if component unmounts or data fetch completes
    return () => clearTimeout(timer);
  }, [loading]);
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">There was an error fetching departments. Please try again later.</Alert>
      </Container>
    );
  }

  if (departments.length === 0) {
    return <Typography>No departments found</Typography>;
  }
  return (
    <React.Fragment>
      <Box sx={{ py: 5 }}>
        <Stack px={3} sx={{ display: { xs: "block", md: "flex" } }}>
          <Box component="div" role="presentation">
            <Typography variant="h6">Faculty</Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" to="/">
                Home
              </Link>
              <Typography sx={{ color: "#757ce8" }}>Faculty</Typography>
            </Breadcrumbs>
          </Box>
        </Stack>

        <Box sx={{ height: "100vh", p: 3, display: { xs: "block", md: "none" } }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="departments"
            variant="scrollable"
            scrollButtons="auto"
          >
            {departments.map((depname, i) => (
              <Tab key={i} label={`${depname}`} {...a11yProps(i)} />
            ))}
          </Tabs>

          {departments.map((dept, i) => (
            <TabPanel value={value} index={i} key={i}>
              <Facultypage dept={dept} />
            </TabPanel>
          ))}
        </Box>

        <Box sx={{ height: '100vh', p: 3, display: { xs: "none", md: "block" } }}>
          <Box display='flex'>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: "20vw", height: "100vh" }}>
              <Tabs orientation='vertical' value={value} onChange={handleChange} aria-label="basic tabs example">
                {departments.map((depname, i) => (
                  <Tab key={i} label={`${depname}`} {...a11yProps(i)} />
                ))}
              </Tabs>
            </Box>

            <Box sx={{ width: "100vw" }}>
              {departments.map((dept, i) => (
                <TabPanel value={value} index={i} key={i}>
                  <Facultypage dept={dept} />
                </TabPanel>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Faculty;


import { Alert, Box,  Breadcrumbs,  CircularProgress,   Stack,  Tab, Tabs, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ClubPage from './ClubPage';

import { useDispatch, useSelector } from 'react-redux';
import { getAllClubUsers } from '../actions/clubActions';
import { Link } from 'react-router-dom';

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

const Clubs = () => {
    const [value, setValue] = useState(0);

   const dispatch = useDispatch()
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
   
    const clubanmes = useSelector(state => state.getAllClubUsersReducer)
    const {users,loading,error} = clubanmes;
    useEffect(() => {
  dispatch(getAllClubUsers())
    
      
    }, [dispatch])
    if(loading){
      return  <CircularProgress sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px',
        margin:"50%"
      }} /> ;
    }
    if(error){
return <Alert severity="error" sx={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '400px',
  color: 'red'
}}><Typography variant='h6'>{error}</Typography></Alert>
    }
  return (
    <React.Fragment>

    <Box sx={{py:5}}>
   <Stack px={3} sx={{display:{xs:"block",md:"flex"}}}>
   <Box component="div" role="presentation">
   <Typography variant="h6">Clubs</Typography>
   <Breadcrumbs aria-label="breadcrumb">
     <Link underline="hover" color="inherit" to="/">
       Home
     </Link>

     <Typography sx={{ color: "#757ce8" }}>Clubs</Typography>
   </Breadcrumbs>
 </Box>
   
   </Stack>
    <Box sx={{height:"100vh",py:3,display:{xs:"block",md:"none"}}}>
   

    

 
 <Tabs  value={value} onChange={handleChange}  aria-label="clubs" variant="scrollable"
  scrollButtons="auto">

 {users.map((clubname,i)=>(<Tab key={i} label={`${clubname.name} Club`} {...a11yProps(i)} />))}
  
   
 </Tabs>

{users.map((club,i)=>(
  <TabPanel value={value} index={i} key={i}>
<ClubPage clubname={club}/>
  </TabPanel>
))}


 
   
    </Box>
    <Box sx={{height:'100vh',py:3,display:{xs:"none",md:"block"}}}>

    
<Box display='flex'>
<Box sx={{ borderBottom: 1, borderColor: 'divider',width:"20vw",height:"100vh" }}>
 
<Tabs  orientation='vertical' value={value} onChange={handleChange} aria-label="basic tabs example">
{users.map((clubname,i)=>(<Tab key={i} label={`${clubname.name} Club`} {...a11yProps(i)} />))}
 
  
</Tabs>
</Box>



<Box sx={{width:"100vw"}}>
{users.map((club,i)=>(
  <TabPanel value={value} index={i} key={i} >
  <ClubPage clubname={club}/>
  </TabPanel>
 ))}
</Box>
  
</Box>
    </Box>
    </Box>
    </React.Fragment>
  )
}

export default Clubs
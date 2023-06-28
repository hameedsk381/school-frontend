
import {  Box,  Breadcrumbs,    Stack,  Tab, Tabs, Typography } from '@mui/material'

import React, {  useState } from 'react';
import PropTypes from 'prop-types';



import { Link } from 'react-router-dom';
import Facultypage from './Facultypage';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
      style={{}}
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

  //  const dispatch = useDispatch()
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
   
    // const departments = useSelector(state => state.getAllClubUsersReducer)
    // const {users,loading,error} = departments;
  //   useEffect(() => {
  // dispatch(getAllClubUsers())
    
      
  //   }, [dispatch])
//     if(loading){
//       return  <CircularProgress sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '400px',
//         margin:"50%"
//       }} /> ;
//     }
//     if(error){
// return <Alert severity="error" sx={{
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   height: '400px',
//   color: 'red'
// }}><Typography variant='h6'>{error}</Typography></Alert>
//     }
  return (
    <React.Fragment>

    <Box sx={{py:5}}>
   <Stack px={3} sx={{display:{xs:"block",md:"flex"}}}>
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
    <Box sx={{height:"100vh",p:3,display:{xs:"block",md:"none"}}}>
    

 
 <Tabs value={value} onChange={handleChange}  aria-label="departments" variant="scrollable"
  scrollButtons="auto">

 {["english", "play school", "science", "telugu", "hindi", "physical education", "mathematics", "office", "computer", "non-teaching"].map((depname,i)=>(<Tab key={i} label={`${depname} `} {...a11yProps(i)} />))}
  
   
 </Tabs>

{["english", "play school", "science", "telugu", "hindi", "physical education", "mathematics", "office", "computer", "non-teaching"].map((dept,i)=>(
  <TabPanel value={value} index={i} key={i}>
<Facultypage dept={dept}/>
  </TabPanel>
))}


 
   
    </Box>
    <Box sx={{height:'100vh',p:3,display:{xs:"none",md:"block"}}}>

    
<Box display='flex'>
<Box sx={{ borderBottom: 1, borderColor: 'divider',width:"20vw",height:"100vh" }}>
 
<Tabs orientation='vertical' value={value} onChange={handleChange} aria-label="basic tabs example">
{["english", "play school", "science", "telugu", "hindi", "physical education", "mathematics", "office", "computer", "non-teaching"].map((depname,i)=>(<Tab key={i} label={`${depname}`} {...a11yProps(i)} />))}
 
  
</Tabs>
</Box>



<Box sx={{width:"100vw"}}>
{["english", "play school", "science", "telugu", "hindi", "physical education", "mathematics", "office", "computer", "non-teaching"].map((dept,i)=>(
  <TabPanel value={value} index={i} key={i} >
<Facultypage dept={dept}/>
  </TabPanel>
))}
</Box>
  
</Box>
    </Box>
    </Box>
    </React.Fragment>
  )
}

export default Faculty
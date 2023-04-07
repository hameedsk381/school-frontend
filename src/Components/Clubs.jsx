
import { Box, Container, Tab, Tabs, Typography } from '@mui/material'

import { useState } from 'react';
import PropTypes from 'prop-types';

import ClubPage from './ClubPage';


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
   
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
   
   
  return (
    <Container sx={{height:"100vh"}}>
 <Typography variant='h2' my={2}>Clubs</Typography>
    
 <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
 
 <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
 {["English","Science","Hindi","Telugu","Social","Service","Maths","Cultural","Sports"].map((clubname,i)=>(<Tab label={`${clubname} Club`} {...a11yProps(i)} />))}
  
   
 </Tabs>
</Box>
{["English","Science","Hindi","Telugu","Social","Service","Maths","Cultural","Sports"].map((club,i)=>(
  <TabPanel value={value} index={i}>
<ClubPage clubname={club}/>
  </TabPanel>
))}


 
   
    </Container>
  )
}

export default Clubs
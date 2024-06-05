import {

  Box,

  Container,

  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, {  useState } from "react";

import UserTable from "./UserTable";
import { useSelector } from "react-redux";
import FeedbackTable from "./FeedbackTable";
import ClubDetails from "./ClubDetails";
import AlumniFeedbackTable from "./AlumniFeedbackTable";
import Announcementpage from "./Announcementpage";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Eventspage from "./Eventspage.jsx";
import AdmissionsList from "./AdmissionsList.jsx";
import AssignTeacherForm from "./AssignTeacherForm.jsx";
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
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Admin = () => {
  const [value, setValue] = useState(parseInt(localStorage.getItem("currentTab")) || 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("currentTab", newValue); // Store the new tab index value in localStorage
  };
  const loginstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = loginstate;
//  useEffect(() => {
//   if(currentUser === null) {
//     navigate("/login")
//   }
//  }, [])
 
  return (
    <Box p={3}>
      { currentUser && currentUser.isAdmin  ? (
        
          <Box>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="adminpanel"
                variant="scrollable"
              >
                <Tab label="User data" {...a11yProps(0)} />
                <Tab label="Feedback data" {...a11yProps(1)} />
                <Tab label="Club data" {...a11yProps(2)} />
                <Tab label="Alumni data" {...a11yProps(3)} />
                <Tab label="Announcements" {...a11yProps(4)} />
                <Tab label="Events" {...a11yProps(5)} />
                <Tab label="Admissions" {...a11yProps(6)} />
                <Tab label="AssignClassTeacher" {...a11yProps(7)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0} >
            <UserTable/>
               </TabPanel>
               <TabPanel value={value} index={1} >
            <FeedbackTable/>
               </TabPanel>
               <TabPanel value={value} index={2} >
            <ClubDetails/>
               </TabPanel>
               <TabPanel value={value} index={3} >
            <AlumniFeedbackTable/>
               </TabPanel>
               <TabPanel value={value} index={4} >
            <Announcementpage/>
               </TabPanel>
               <TabPanel value={value} index={5} >
            <Eventspage/>
               </TabPanel>
               <TabPanel value={value} index={6} >
            <AdmissionsList/>
               </TabPanel>
               <TabPanel value={value} index={7} >
            <AssignTeacherForm/>
               </TabPanel>
          </Box>
         
        
      ) : (
        <Container component={Paper} sx={{p:10}}>
        <Typography textAlign={'center'} variant="h4" > Please Login to view this page </Typography>
       <Login/>
        </Container>
      )}
    </Box>
  );
};

export default Admin;

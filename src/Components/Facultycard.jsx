import {
  Avatar,
  Box,
  Breadcrumbs,
  Container,
  Grid,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import REACT_API_URL from "../config";
import Swal from "sweetalert2";

const Facultycard = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const profile = async () => {
    const res = await axios.get(`${REACT_API_URL}/users/getuser/${id}`);
    setUser(res.data);
 console.log(res.data)
  };
  const profiledata = {
  
        
    name: user.name,
    email: user.email,
    department: user.department,
    regId: user.regId,
    profilePicture:user.profilePicture,
    isAdmin:user.isAdmin,
    currentlyTeaching:user.currentlyTeaching,
    actingClassTeacherFor:user.actingClassTeacherFor,
    contact:user.contact,
    additionalTeachingClasses:user.additionalTeachingClasses,
    additionalTeachingDepartments:user.additionalTeachingDepartments,
    languages:user.languages,
    expertise:user.expertise,
    qualifications:user.qualifications



    
  
 }
  useEffect(() => {
    profile();
  }, []);

  return (
    <>
      <Box
        sx={{ mx: { xs: 0, lg: 25 }, p: 3, height: "100%", color: "#2196f3" }}
      >
      
        <Paper sx={{ p: 2, my: 2 }} elevation={2}>
          <Box>
            <Box
              sx={{
                width: "100%",
                height: { xs: 100, lg: 150 },

                opacity: 0.8,
                background:
                  "linear-gradient(to right, #2196f3 ,#2196f3, #2196f3)",
              }}
            />
            <Avatar variant="rounded"
              src={`data:image/jpeg;base64,${profiledata.profilePicture}`}
              onClick={()=>{Swal.fire({
                title: `${profiledata.name}`,
               
                imageUrl: `data:image/jpeg;base64,${profiledata.profilePicture}`,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
              })}}
              sx={{
                my: { xs: -6, lg: -10 },
                margin: "auto",
objectFit:"cover",
                width: { lg: 150, xs: 100 },
                height: { lg: 150, xs: 100 },
                border: "5px solid white",
              }}
            />
            <Stack
              sx={{
                mt: { xs: 7, lg: 11 },
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: 17, lg: 25, textTransform: "capitalize" },
                }}
              >
                {profiledata.name}
              </Typography>
              <Typography
                sx={{ fontWeight: "bold", fontSize: { xs: 14, lg: 18 },textTransform:'capitalize' }}
                color={grey[600]}
              >
                {profiledata.department} Department
              </Typography>
            </Stack>
          </Box>
          <Container>
          <Grid  container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <ListItem>
              <ListItemText primary="Email" secondary={profiledata.email} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Qualifications" secondary={profiledata.qualifications} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Contact" secondary={profiledata.contact} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Registration ID" secondary={profiledata.regId} />
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ListItem>
            <ListItemText primary="Acting Class Teacher For" secondary={profiledata.actingClassTeacherFor} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Expertise" secondary={profiledata.expertise} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Currently Teaching" secondary={`${profiledata.currentlyTeaching},${profiledata.additionalTeachingClasses}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Additional Teaching Departments" secondary={profiledata.additionalTeachingDepartments} />
            </ListItem>
          
            <ListItem>
              <ListItemText primary="Languages" secondary={profiledata.languages} />
            </ListItem>
          
          </Grid>
        </Grid>
          </Container>
        </Paper>
      </Box>
    </>
  );
};

export default Facultycard;

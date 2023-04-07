import { Avatar, Box, Breadcrumbs, List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getUser } from '../actions/userActions';

const Facultycard = () => {
  const [user,setUser]= useState({})
  const {id}  =  useParams();
  const profile = async()=>{
    const res = await axios.get(`/api/users/${id}`);
setUser(res.data)
  }
   useEffect(() => {
   profile()
   }, [])
   
 
    
  return (
    <>
    <Box sx={{ mx: {xs:0,lg:25}, p: 3, height: "100%" ,color:"#2196f3"}}>
    <Box component="div" role="presentation" sx={{my:2}}>
    <Typography variant="h6">Profile</Typography>
    <Breadcrumbs aria-label="breadcrumb" >
      <Link underline="hover" color="inherit" to="/">
      Home
      </Link>
      <Link
        underline="hover"
        color="inherit"
        to="/faculty"
      >
       Faculty
      </Link>
      <Typography sx={{ color: "#757ce8",textTransform:"capitalize" }}>{user.name}</Typography>
    </Breadcrumbs>
    </Box>
          
         
    
          <Paper  sx={{p:2,my:2}} elevation={2} >
          <Box>
          <Box
            sx={{
              width: "100%",
              height: {xs:100,lg:150},
           
              opacity: 0.8,
              background: "linear-gradient(to right, #2196f3 ,#2196f3, #2196f3)",
            }}
          />
          <Avatar
            src={user.profilepic}
            sx={{
              my: {xs:-6,lg:-10},
         margin:"auto",
             
              width: {lg:120,xs:100},
              height: {lg:120,xs:100},
              border: "5px solid white",
            }}
          />
          <Stack
            sx={{
              mt: {xs:7,lg:11},
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{fontWeight:"bold",fontSize:{xs:17,lg:25,textTransform:"capitalize"}}}>{user.name}</Typography>
            <Typography sx={{fontWeight:"bold",fontSize:{xs:14,lg:18}}} color={grey[600]}>
              {user.department}  Department
            </Typography>
          </Stack>
         
         
        </Box>
          <Box>
          <List>
          <ListItem>
         <ListItemText>
         <Typography variant="h6" sx={{fontFamily:"-moz-initial",fontSize:{xs:16,lg:20}}}>
         Designation : <Typography sx={{display:"inline-flex",fontSize:{xs:12,lg:15},color:"#000000",}}>{user.regId}</Typography>
         </Typography>
         </ListItemText>
          </ListItem>
          <ListItem>
          <ListItemText>
          <Typography variant="h6" sx={{fontFamily:"-moz-initial",fontSize:{xs:16,lg:20}}}>
          Qualification : <Typography sx={{display:"inline-flex",fontSize:{xs:12,lg:15},color:"#000000"}}>{user.email}</Typography>
          </Typography>
          </ListItemText>
           </ListItem>
           <ListItem>
           <ListItemText>
           <Typography variant="h6" sx={{fontFamily:"-moz-initial",fontSize:{xs:16,lg:20}}}>
           Date of joining : <Typography sx={{display:"inline-flex",fontSize:{xs:12,lg:15},color:"#000000"}}>{Date.now()}</Typography>
           </Typography>
           </ListItemText>
            </ListItem>
            <ListItem>
            <ListItemText>
            <Typography variant="h6" sx={{fontFamily:"-moz-initial",fontSize:{xs:16,lg:20}}}>
            Experience : <Typography sx={{display:"inline-flex",fontSize:{xs:12,lg:15},color:"#000000"}}>Social</Typography>
            </Typography>
            </ListItemText>
             </ListItem>
          </List>
          </Box>
          </Paper>
        </Box>
        </>
  )
}

export default Facultycard
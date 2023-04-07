import { Box, Breadcrumbs, Divider, IconButton, Paper, Stack } from "@mui/material";
import React, {  useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { loginUser, updateProfilePic } from "../actions/userActions";
import axios from "axios";
import { Badge, Menu, MenuItem, Slider } from "@mui/material";
import { styled } from "@mui/material/styles";
import Commonmenu from "./Commonmenu";
import { CameraAlt } from "@mui/icons-material";
import Cropper from "react-easy-crop";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

const User = () => {
  const dispatch = useDispatch();
  const loginstate = useSelector((state) => state.loginUserReducer);
  const { loading, error,currentUser } = loginstate;
 

  
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
  <Typography sx={{ color: "#757ce8",textTransform:"capitalize" }}>{currentUser.name}</Typography>
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
        src={currentUser.profilePic}
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
        <Typography sx={{fontWeight:"bold",fontSize:{xs:17,lg:25,textTransform:"capitalize"}}}>{currentUser.name}</Typography>
        <Typography sx={{fontWeight:"bold",fontSize:{xs:14,lg:18}}} color={grey[600]}>
          {currentUser.department}  Department
        </Typography>
      </Stack>
     
     
    </Box>
      <Box>
      <List>
      <ListItem>
     <ListItemText>
     <Typography variant="h6" sx={{fontFamily:"-moz-initial",fontSize:{xs:16,lg:20}}}>
     Designation : <Typography sx={{display:"inline-flex",fontSize:{xs:12,lg:15},color:"#000000",}}>{currentUser.regId}</Typography>
     </Typography>
     </ListItemText>
      </ListItem>
      <ListItem>
      <ListItemText>
      <Typography variant="h6" sx={{fontFamily:"-moz-initial",fontSize:{xs:16,lg:20}}}>
      Qualification : <Typography sx={{display:"inline-flex",fontSize:{xs:12,lg:15},color:"#000000"}}>{currentUser.email}</Typography>
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
      
  );
};

export default User;

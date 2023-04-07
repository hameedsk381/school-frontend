import { Alert, Avatar, Box, Breadcrumbs, Button, Card, CardMedia, Container, Grid, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllUsers, getUser } from '../actions/userActions';
import Profilecard from './Profilecard';
import Teachercards from './Teachercards';

const Faculty = () => {
    const [user,setUser] = useState()
    const dispatch = useDispatch();
    const loginstate = useSelector((state) => state.getAllUsersReducer);
    const { loading, error ,users} = loginstate;

    useEffect(() => {
     
      dispatch(getAllUsers())
    }, []);
    
  return (
    <Container>
    <Box component="div" role="presentation" sx={{my:2}}>
<Typography variant="h6">Faculty</Typography>
<Breadcrumbs aria-label="breadcrumb" >
  <Link underline="hover" color="inherit" to='/'>
  Home
  </Link>
 
  <Typography sx={{ color: "#757ce8" }}>Faculty</Typography>
</Breadcrumbs>
</Box>
  <Grid container spacing={3} sx={{p:3}}>
  {loading && (<Skeleton variant="rectangular" width={210} height={60} />)}
  {error && (<Alert severity="error">This is an error alert — check it out!</Alert>)}
  
  {users.map((teacher,i)=>(
   <Grid item xs={12} lg={3} sx={{p:2}} key={i}>

   <Profilecard data={teacher}/>
   </Grid>
  ))}
  </Grid>
    </Container>

  )
}

export default Faculty
import { Forward } from '@mui/icons-material'
import { Container, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

const Academics = () => {
  return (
 <Container sx={{height:"100vh"}}>
 
 <Grid container component={Paper} elevation={4} p={3} spacing={4}>
 <Grid item xs={3}>
 <Typography variant='h5'>Academics</Typography>
 <Divider sx={{border:"1px solid black",my:2}}/>
 <List dense>
 <ListItem>
 <ListItemIcon><Forward/></ListItemIcon>
 <ListItemButton sx={{fontSize:'small'}}>Teaching methods</ListItemButton>
 </ListItem>
 <ListItem>
 <ListItemIcon><Forward/></ListItemIcon>
 <ListItemButton sx={{fontSize:'small'}}>Teaching methods</ListItemButton>
 </ListItem>
 <ListItem>
 <ListItemIcon><Forward/></ListItemIcon>
 <ListItemButton sx={{fontSize:'small'}}>Teaching methods</ListItemButton>
 </ListItem>
 </List>
 </Grid>
 <Grid item xs={9}>
 <Stack>
 <Typography variant='h6' color={'whitesmoke'} bgcolor='Highlight' p={1}>Teaching Methodologies</Typography>

 <Typography p={2}>

 
 The school benefits from the use of a modern building with purpose-built facilities. Essentially, all the teaching is done in the two Academic Blocks or in the adjoining Vigyanshala building. We also have a seminar hall, an NDTV Room and a well-equipped IT Hub which is in the reach of students so that they can carry formal meets or group discussions, SEB Meetings, Guest Lectures or career counselling sessions with the school faculty members and visiting faculty.</Typography>
 </Stack>
 </Grid>
 </Grid>
 </Container>
  )
}

export default Academics
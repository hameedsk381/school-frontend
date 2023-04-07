import { useState, useEffect } from 'react';
import { Typography,  Grid, Avatar, List, ListItem, ListItemAvatar, ListItemText, CircularProgress, ListItemIcon, Box, Alert } from '@mui/material';
import axios from 'axios';
import { Forward } from '@mui/icons-material';
import dotenv from 'dotenv'
dotenv.config()
const ClubPage = ({clubname})=> {
  const [members, setMembers] = useState(null);
  const [len,setlen] = useState(0)
  const getUsers = async()=>{
    await axios.get(`${process.env.REACT_URL}/api/clubs/${clubname}`).then(response => {setMembers(response.data);setlen(response.data.length)})
      .catch(error => console.error(error));
      
    }
    useEffect(() => {
      getUsers()
    })
//   useEffect(() => {
//     axios.get('/api/clubs/1')
//       .then(response => setClub(response.data))
//       .catch(error => console.error(error));
//   }, []);

  if (!members) {
    return <CircularProgress />;
  }

//   const { name, leader, members } = club;

  return (
    <Grid container spacing={3}>
    <Grid item xs={12}>
    <Box>
    <Typography align='left' variant='h4' color={'Highlight'}>Description</Typography>
      <Typography p={3}>The Teachers Club is a place where teachers can come together to discuss teaching strategies, share resources, and collaborate on projects. The club holds regular meetings and workshops where teachers can learn from each other and develop their skills.

      The club also aims to promote innovation in teaching and encourage teachers to try new methods and technologies in the classroom. Through the club, teachers can keep up to date with the latest developments in education and stay connected with other educators in the community.</Typography>
    </Box>
  </Grid>
      <Grid item xs={12}>
        <Box>
        <Typography align='left' variant='h4' color={'Highlight'}>Aims</Typography>
        <List>
        {["Increase the use of good grammar and speak fluently in everyday situations.","Learn English pronunciation and real spoken English","Learn chunks of phrases, linking verbs and extensive vocabulary.","Be a member of an interactive community and encourage life-long learning of English.","Enhance quick learning through the fun way in a casual setting."].map(item=>(
          <ListItem>
        <ListItemIcon><Forward color='info'/></ListItemIcon>
        <ListItemText primary={item}/>
        </ListItem>
        ))}
        </List>
        </Box>
      </Grid>
     
      {/*<Grid item xs={12}>
        <Paper>
          <Typography variant="h5">Leader:</Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>{leader.name.substring(0, 1)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={leader.name} secondary={`Roll No: ${leader.rollno}`} />
            </ListItem>
          </List>
        </Paper>
        </Grid>*/}
     { <Grid item xs={12}>
        <Box>
         <Typography align='left' variant='h4' color={'Highlight'}>Members</Typography>
          <List>
            {len === 0 ? (<Alert severity="info">No members in the Club</Alert>) : members.map(member => (
              <ListItem key={member._id}>
                <ListItemAvatar>
                  <Avatar>{member.name.substring(0, 1)}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={member.name} secondary={`Roll No: ${member.rollNo}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid> }
    </Grid>
  );
}

export default ClubPage;

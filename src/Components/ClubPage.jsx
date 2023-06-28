import { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  ListItemIcon,
  Box,
  Alert,
} from "@mui/material";
import axios from "axios";
import { Forward } from "@mui/icons-material";
import REACT_API_URL from "../config";

const ClubPage = ({ clubname }) => {
  const [members, setMembers] = useState([]);
  const [len, setlen] = useState(0);
  const getUsers = async () => {
    await axios
      .get(`${REACT_API_URL}/clubs`)
      .then((response) => {
        const users = (name) => {
          const group = response.data.find((group) => group.name === name);
          return group ? group.members : null;
        };
        const clubmembers = users(clubname.name);
        setMembers(clubmembers);
        setlen(clubmembers.length);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUsers();
  });
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
          <Typography align="left" variant="h4" color={"#2196f3"}>
            Description
          </Typography>
          <Typography
            p={3}
            justifyContent={"center"}
            textAlign={"justify"}
            fontSize={"large"}
            fontFamily={"cursive"}
          >
            {clubname.description}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <Typography align="left" variant="h4" color={"#2196f3"}>
            Aims
          </Typography>
          <List>
            {[
              "Increase the use of good grammar and speak fluently in everyday situations.",
              "Learn English pronunciation and real spoken English",
              "Learn chunks of phrases, linking verbs and extensive vocabulary.",
              "Be a member of an interactive community and encourage life-long learning of English.",
              "Enhance quick learning through the fun way in a casual setting.",
            ].map((item, i) => (
              <ListItem key={i}>
                <ListItemIcon>
                  <Forward color="info" />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    textAlign: "justify",
                    fontFamily: "cursive",
                    fontSize: "large",
                  }}
                  primary={item}
                />
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
      {
        <Grid item xs={12}>
          <Box>
            <Typography align="left" variant="h4" color={"#2196f3"}>
              Members
            </Typography>
            <List>
              {len === 0 ? (
                <Alert severity="info">No members in the Club</Alert>
              ) : (
                members.map((member) => (
                  <ListItem key={member._id}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#2196f3" }}>
                        {member.name.substring(0, 1)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={member.name}
                      secondary={`Roll No: ${member.rollNo}`}
                    />
                  </ListItem>
                ))
              )}
            </List>
          </Box>
        </Grid>
      }
    </Grid>
  );
};

export default ClubPage;

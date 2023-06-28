import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import axios from 'axios';
import styled from '@emotion/styled';
import REACT_API_URL from '../config';
import {  FiberManualRecordOutlined } from '@mui/icons-material';

const useStyles = styled({
    table: {
      minWidth: 650,
      maxHeight:250
    },
    tableContainer: {
      margin: '20px 0',
      height: '400px',
      overflow: 'auto'
    },
    title: {
      fontWeight: 'bold',
      marginBottom: '10px'
    }
  });
  
function ClubDetails() {
  const classes = useStyles();
  const [clubData, setClubData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const data = async()=>{
   await axios
    .get(`${REACT_API_URL}/clubs`)
    .then((response) => {
      setClubData(response.data);
      console.log(response.data)
      setLoading(false);
    })
    .catch((error) => {
      setError(error);
      setLoading(false);
    });
  }
  useEffect(() => {
    setLoading(true);
   data()
  }, []);

  if (loading) {
    return <CircularProgress sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px'
      }} />;
  }

  if (error) {
    return <Alert severity="error"  sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px',
        color: 'red'
      }}>{error.message}</Alert>;
  }

  return (
    <Paper sx={{p:3}}>
      <Typography variant="h4" my={3} textAlign={'center'} className={classes.title}>
        Club Details
      </Typography>
      <TableContainer component={Paper} variant='outlined' className={classes.tableContainer}>
        <Table className={classes.table} aria-label="club details table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>President</TableCell>
              <TableCell>Chairlady</TableCell>
              <TableCell>Secretary</TableCell>
              <TableCell>Members</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {clubData.map((member, index) => (
              <TableRow key={index}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.president}</TableCell>
                <TableCell>{member.chairlady}</TableCell>
                <TableCell>{member.secretary}</TableCell>
                <TableCell>
                <List dense sx={{overflow:"auto"}}>
                {member.members.map((item,i)=>(
                    <ListItem key={i}>
                    <ListItemIcon><FiberManualRecordOutlined fontSize='small'/></ListItemIcon>
<ListItemText primary={item.name}/>
                    </ListItem>
            ))}
                </List>
                </TableCell>
                <TableCell>{new Date(member.date).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ClubDetails;

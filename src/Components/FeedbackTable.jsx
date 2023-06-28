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
 
} from '@mui/material';
import axios from 'axios';
import styled from '@emotion/styled';
import REACT_API_URL from '../config';

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

function FeedbackTable() {
  const classes = useStyles();
  const [feedbackData, setFeedbackData] = useState([]);
const [loading,setLoading] = useState(false);
const [err,setErr] = useState(null)
  const getFeedbackData = async () => {
    try {
      const response = await axios.get(`${REACT_API_URL}/feedback`);
      setFeedbackData(response.data);
      setLoading(false)
    } catch (error) {
      setErr(error);
      setLoading(false)
    }
  };
  

  useEffect(() => {
    getFeedbackData();
  }, []);

  
  if (loading) {
    return <CircularProgress sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px'
      }} />;
  }

  if (err) {
    return <Alert severity="error" sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px',
        color: 'red'
      }}><Typography variant='h6'>{err}</Typography></Alert>;
  }
  return (
    <Paper sx={{p:3}}>
      <Typography variant="h4" my={2} textAlign={'center'} className={classes.title}>
        Feedback Data
      </Typography>
      <TableContainer variant='outlined'  component={Paper}  className={classes.tableContainer}>
        <Table className={classes.table} aria-label="feedback table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Relation</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbackData.map((feedback, index) => (
              <TableRow key={index}>
                <TableCell>{feedback.name}</TableCell>
                <TableCell>{feedback.relation}</TableCell>
                <TableCell>{feedback.email}</TableCell>
                <TableCell>{feedback.contactNumber}</TableCell>
                <TableCell>{feedback.message}</TableCell>
                <TableCell>{new Date(feedback.date).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default FeedbackTable;

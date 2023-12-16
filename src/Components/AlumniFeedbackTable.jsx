import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import styled from '@emotion/styled';
import REACT_API_URL from '../config';

const useStyles = styled({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    margin: '20px 0',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '10px',
  },
});

function AlumniFeedbackTable() {
  const classes = useStyles();
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${REACT_API_URL}/alumni`);
        setFeedbackData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${REACT_API_URL}/alumni/${id}`);
      setFeedbackData((prevState) =>
        prevState.filter((feedback) => feedback._id !== id)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" className={classes.title}>
        Alumni Feedback
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography>{error}</Typography>
      ) : (
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="feedback table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Father's Name</TableCell>
                <TableCell>Mother's Name</TableCell>
                <TableCell>Teacher's Name</TableCell>
                <TableCell>Last Class Studied</TableCell>
                <TableCell>Year of Passing</TableCell>
                <TableCell>Testimony</TableCell>
                <TableCell>Principal</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbackData.map((feedback) => (
                <TableRow key={feedback._id}>
                 <TableCell>{feedback.fullName}</TableCell>
<TableCell>{feedback.emailAddress}</TableCell>
<TableCell>{feedback.fathersName}</TableCell>
<TableCell>{feedback.mothersName}</TableCell>
<TableCell>{feedback.teachersName}</TableCell>
<TableCell>{feedback.lastClassStudied}</TableCell>
<TableCell>{feedback.yearOfPassing}</TableCell>
<TableCell>{feedback.anythingToShare}</TableCell>



                  <TableCell>
                    <IconButton onClick={() => handleDelete(feedback._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}

export default AlumniFeedbackTable;

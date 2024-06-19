import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import moment from 'moment';
import REACT_API_URL from '../config';

const TeacherHomeworks = ({ teacherId }) => {
  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeacherHomeworks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${REACT_API_URL}/homework/teacher/${teacherId}`);
        setHomeworks(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Failed to fetch teacher homeworks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeacherHomeworks();
  }, [teacherId]);
if(homeworks.length === 0)
  {
    return <Alert variant='standard' severity='info'>No homeworks assigned yet</Alert>
  }
  return (
    <Paper variant='outlined' sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Homeworks Assigned by you</Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Expiration Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {homeworks.map((homework) => (
                <TableRow key={homework._id}>
                  <TableCell>{homework.description}</TableCell>
                  <TableCell>{homework.note}</TableCell>
                  <TableCell>{homework.classname.name}</TableCell>
                  <TableCell>{homework.subject.name}</TableCell>
                  <TableCell>{moment(homework.expirationTime).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default TeacherHomeworks;

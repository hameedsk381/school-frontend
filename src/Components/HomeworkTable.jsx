import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Alert } from "@mui/material";
import REACT_API_URL from "../config";

const HomeworkTable = ({ classname }) => {
  const [homeworkByClassSection, setHomeworkByClassSection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeworkDataByClassSection = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${REACT_API_URL}/homework/${classname}`);
        const { homework } = response.data;
        setHomeworkByClassSection(homework);
      } catch (error) {
        console.error('Failed to fetch homework data:', error);
        setError('Failed to fetch homework data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHomeworkDataByClassSection();
  }, [classname]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ my: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} elevation={3} sx={{ p: { xs: 0, lg: 2 }, bgcolor: 'white' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: { xs: 13, lg: 20 }, color: '#2196f3' }} variant="head">Subject</TableCell>
            <TableCell sx={{ fontSize: { xs: 13, lg: 20 }, color: '#2196f3' }} align="left" variant="head">Homework</TableCell>
            <TableCell sx={{ fontSize: { xs: 13, lg: 20 }, color: '#2196f3' }} align="left" variant="head">Teacher</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {homeworkByClassSection.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Typography variant="subtitle1" color="textSecondary">No homework for today</Typography>
              </TableCell>
            </TableRow>
          ) : (
            homeworkByClassSection.map((row) => (
              <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ fontWeight: "bold", fontSize: { xs: 14, lg: 18 }, textTransform: "capitalize" }}>
                  {row.subject.name || '------------------'}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: { xs: 12, lg: 16 }, textTransform: "capitalize" }}>
                  <Typography>{row.description || 'No homework for today'}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography color={"#2196f3"} sx={{ fontSize: { xs: 10, lg: 14 }, textTransform: "capitalize" }}>Note: {row.note || '-'}</Typography>
                </TableCell>
                <TableCell align="left">{row.teacher.name || '-'}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HomeworkTable;

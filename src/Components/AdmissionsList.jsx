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
  Stack,
  Button,
  Box,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import styled from '@emotion/styled';
import REACT_API_URL from '../config';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { FileDownload } from '@mui/icons-material';
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

function AdmissionsList() {
  const classes = useStyles();
  const [admissionData, setadmissionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${REACT_API_URL}/admissions`);
        setadmissionData(response.data);
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
      await axios.delete(`${REACT_API_URL}/admissions/${id}`);
      setadmissionData((prevState) =>
        prevState.filter((admission) => admission._id !== id)
      );
      setInterval(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(admissionData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'admissionData');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'Admissions.xlsx');
  };
  return (
    <Paper sx={{ p: 3 }}>
      
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography>{error}</Typography>
      ) : (
        <Box>
        <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography variant="h4" className={classes.title}>
       Admissions
      </Typography>
      <Button variant='contained' startIcon={<FileDownload/>} onClick={handleExportToExcel}>Export to excel</Button>
        </Stack>
      <TableContainer component={Paper} className={classes.tableContainer} sx={{my:3}}>
          <Table className={classes.table} aria-label="admission table">
          <TableHead>
  <TableRow>
    <TableCell>First Name</TableCell>
    <TableCell>Last Name</TableCell>
    <TableCell>Email</TableCell>
    <TableCell>Phone Number</TableCell>
  
  </TableRow>
</TableHead>

            <TableBody>
              {admissionData.length !== 0  ? admissionData.map((admission) => (
                <TableRow key={admission._id}>
               <TableCell>{admission.firstName}</TableCell>
<TableCell>{admission.lastName}</TableCell>
<TableCell>{admission.email}</TableCell>
<TableCell>{admission.phoneNum}</TableCell>

<TableCell>
                    <IconButton onClick={() => handleDelete(admission._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )) : <Alert severity='info' sx={{m:2,width:"100%"}}>No registrations yet</Alert>}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
        
      )}
     
    </Paper>
  );
}

export default AdmissionsList;

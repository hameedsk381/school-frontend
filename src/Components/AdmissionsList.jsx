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
  Snackbar,
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
  const [snack, setShowsnack] = useState(false);
  const [snackmsg,setSnackmsg] = useState('');
  const [snacktype,setSnacktype] = useState('info');
  const fetchData = async () => {
    try {
      const response = await axios.get(`${REACT_API_URL}/admissions`);
      setShowsnack(true)
      setSnackmsg('admissions fetched successfully')
      setSnacktype('success')
      setadmissionData(response.data);
    } catch (error) {
      setError(error.message);
      setShowsnack(true)
      setSnackmsg('Error fetching admissions data')
      setSnacktype('error')
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${REACT_API_URL}/admissions/${id}`);
      setShowsnack(true)
      setSnackmsg('admission deleted successfully')
      setSnacktype('success')
      setadmissionData((prevState) =>
        prevState.filter((admission) => admission._id !== id)
      );
      setLoading(true);
    } catch (error) {
      console.log(error.message);
      setShowsnack(true)
      setSnackmsg('Error fetching admissions data')
      setSnacktype('error')
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
          <Table className={classes.table} aria-label="admission table" sx={{ tableLayout: 'auto' }}>
          <TableHead>
  <TableRow>
    <TableCell>Student Name</TableCell>
    <TableCell>Email</TableCell>
    <TableCell>Phone Number</TableCell>
    <TableCell>Gender</TableCell>
    <TableCell>Date of Birth</TableCell>
    <TableCell>Mother Tongue</TableCell>
    <TableCell>Father Name</TableCell>
    <TableCell>Father Occupation</TableCell>
    <TableCell>Mother Name</TableCell>
    <TableCell>Mother Occupation</TableCell>
    <TableCell>Bank Account Number</TableCell>
    <TableCell>Bank Name</TableCell>
    <TableCell>Bank Branch</TableCell>
    <TableCell>IFSC Code</TableCell>
    <TableCell>WhatsApp Number</TableCell>
    <TableCell>Guardian Name</TableCell>
    <TableCell>Guardian Occupation</TableCell>
    <TableCell>Nationality</TableCell>
    <TableCell>Caste</TableCell>
    <TableCell>Sub Caste</TableCell>
    <TableCell>Residential Address</TableCell>
    <TableCell>Previous School</TableCell>
    <TableCell>School Code</TableCell>
    <TableCell>Studied Class</TableCell>
    <TableCell>Medium</TableCell>
    <TableCell>Eligible For Promotion</TableCell>
    <TableCell>Days Present in Previous School</TableCell>
    <TableCell>Transfer Certificate Number</TableCell>
    <TableCell>Class Joined</TableCell>
    <TableCell>Child Info Number</TableCell>
    <TableCell>First Language</TableCell>
    <TableCell>Second Language</TableCell>
    <TableCell>Personal Mark for Identification 1</TableCell>
    <TableCell>Personal Mark for Identification 2</TableCell>
    <TableCell>Remarks</TableCell>
    <TableCell>Accept Terms and Conditions</TableCell>
    <TableCell>Signature</TableCell>
    <TableCell>Passport Photo</TableCell>
    <TableCell>Delete</TableCell>
  </TableRow>
</TableHead>

            <TableBody>
              {admissionData.length !== 0  ? admissionData.map((admission) => (
                <TableRow key={admission._id}>
               <TableCell>{admission.studentName}</TableCell>
<TableCell>{admission.email}</TableCell>
<TableCell>{admission.phoneNumber}</TableCell>
<TableCell>{admission.gender}</TableCell>
<TableCell>{admission.dateOfBirth}</TableCell>
<TableCell>{admission.motherTongue}</TableCell>
<TableCell>{admission.fatherName}</TableCell>
<TableCell>{admission.fatherOccupation}</TableCell>
<TableCell>{admission.motherName}</TableCell>
<TableCell>{admission.motherOccupation}</TableCell>
<TableCell>{admission.bankAccountNum}</TableCell>
<TableCell>{admission.bankName}</TableCell>
<TableCell>{admission.bankBranch}</TableCell>
<TableCell>{admission.ifscCode}</TableCell>
<TableCell>{admission.whatsappNumber}</TableCell>
<TableCell>{admission.guardianName}</TableCell>
<TableCell>{admission.guardianOccupation}</TableCell>
<TableCell>{admission.nationality}</TableCell>
<TableCell>{admission.caste}</TableCell>
<TableCell>{admission.subCaste}</TableCell>
<TableCell>{admission.residentialAddress}</TableCell>
<TableCell>{admission.previousSchool}</TableCell>
<TableCell>{admission.schoolCode}</TableCell>
<TableCell>{admission.studiedClass}</TableCell>
<TableCell>{admission.medium}</TableCell>
<TableCell>{admission.isEligibleForPromotion ? 'yes' : 'no' }</TableCell>
<TableCell>{admission.daysPresentInPreviousSchool}</TableCell>
<TableCell>{admission.transferCertificateNum}</TableCell>
<TableCell>{admission.classJoined}</TableCell>
<TableCell>{admission.childInfoNum}</TableCell>
<TableCell>{admission.firstLanguage}</TableCell>
<TableCell>{admission.secondLanguage}</TableCell>
<TableCell>{admission.personalMarksIdentification1}</TableCell>
<TableCell>{admission.personalMarksIdentification2}</TableCell>
<TableCell>{admission.remarks}</TableCell>
<TableCell>{admission.acceptTerms ? 'yes' : 'no'}</TableCell>
<TableCell><img src={admission.signature} alt="Signature" /></TableCell>
<TableCell><img src={admission.passportPhoto} alt="Passport Photo" /></TableCell>
<TableCell>
                    <IconButton onClick={() => handleDelete(admission._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )) : <Alert severity='info' sx={{m:2,width:"500px"}}>No registrations yet</Alert>}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
        
      )}
      <Snackbar  
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }} 
          open={snack} 
          autoHideDuration={3000} 
          onClose={() => setShowsnack(false)}
        >
         <Alert  severity={snacktype}>
         {snackmsg}
         </Alert>
       </Snackbar>
    </Paper>
  );
}

export default AdmissionsList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, Container, Paper, Grid, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';

function ExamForm({ teacherInfo }) {
    const [examData, setExamData] = useState({
        type: '',
        date: '',
        classId: '123',  // Pre-set from logged-in teacher info
        studentsResults: [],
        year:''
    });
    const [subjects, setSubjects] = useState([]);  // Assuming subjects are also part of teacherInfo
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (event) => {
        setExamData({ ...examData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async () => {
        try {
            await axios.post('/api/exams', examData);
            setSnackbarMessage('Exam created successfully!');
            setIsError(false);
            setOpenSnackbar(true);
        } catch (error) {
            setSnackbarMessage('Failed to create exam: ' + error.message);
            setIsError(true);
            setOpenSnackbar(true);
        }
    };

    return (
        <Container component={Paper} elevation={3} sx={{ p: 3, mt: 4 }}>
            <Typography variant="h5" gutterBottom>Create Exam for {}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="exam-type-label">Exam Type</InputLabel>
                        <Select
                            labelId="exam-type-label"
                            name="type"
                            value={examData.type}
                            label="Exam Type"
                            onChange={handleChange}
                        >
                            {['Midterm', 'Final', 'Quiz', 'Unit Test'].map(type => (
                                <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
               <Grid item xs={6}>
               <TextField
                    fullWidth
                    type="date"
                    label="Exam date"
                    name="date"
                    InputLabelProps={{ shrink: true }}
                    value={examData.date}
                    onChange={handleChange}
                />
               </Grid>
               <Grid item xs={6}>
               <FormControl fullWidth>
                   <InputLabel id="exam-year-label">Exam year</InputLabel>
                   <Select variant='standard'
                       labelId="exam-year-label"
                       name="year"
                       value={examData.year}
                       onChange={handleChange}
                   >
                       {Array.from({length: 61}, (_, i) => 1990 + i).map(year => (
                           <MenuItem key={year} value={year}>{year}</MenuItem>
                       ))}
                   </Select>
               </FormControl>
               </Grid>
               
                {/* Display for subjects and input fields for marks might be added here */}
            </Grid>
            <Button onClick={handleSubmit} variant="contained" sx={{ mt: 3 }}>Submit Exam</Button>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity={isError ? 'error' : 'success'} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default ExamForm;

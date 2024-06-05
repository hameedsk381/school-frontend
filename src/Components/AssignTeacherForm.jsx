import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Paper,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import REACT_API_URL from '../config';


function AssignTeacherForm() {
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isError, setIsError] = useState(false);
  
    // Fetch classes
    useEffect(() => {
      axios.get(`${REACT_API_URL}/api/classes`).then(response => {
        setClasses(response.data);
        console.log(response.data)
      }).catch(error => console.error('Error fetching classes:', error));
    }, []);
  
    // Fetch teachers
    useEffect(() => {
      axios.get(`${REACT_API_URL}/management`).then(response => {
        setTeachers(response.data);
      }).catch(error => console.error('Error fetching teachers:', error));
    }, []);
  
    const handleClassChange = (event) => {
      setSelectedClass(event.target.value);
    };
  
    const handleTeacherChange = (event) => {
      setSelectedTeacher(event.target.value);
    };
  
    const handleSubmit = () => {
      axios.post(`${REACT_API_URL}/api/classes/${selectedClass}/assign-teacher`, { teacherId: selectedTeacher })
        .then(response => {
          setSnackbarMessage(response.data.message);
          setIsError(false);
          setOpenSnackbar(true);
        })
        .catch(error => {
          setSnackbarMessage('Failed to assign teacher: ' + error.message);
          setIsError(true);
          setOpenSnackbar(true);
          console.log(error)
        });
    };
  
    return (
      <Container component={Paper} elevation={3} sx={{ p: 3, mt: 4, maxWidth: 600 }}>
        <Typography variant="h6">Assign Class Teacher</Typography>
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="class-label">Class</InputLabel>
          <Select
            labelId="class-label"
            value={selectedClass}
            label="Class"
            onChange={handleClassChange}
          >
            {classes.map(cls => (
              <MenuItem key={cls._id} value={cls._id}>{cls.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="teacher-label">Teacher</InputLabel>
          <Select
            labelId="teacher-label"
            value={selectedTeacher}
            label="Teacher"
            onChange={handleTeacherChange}
          >
            {teachers.map(teacher => (
              <MenuItem key={teacher._id} value={teacher._id}>{teacher.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Assign Teacher</Button>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity={isError ? 'error' : 'success'} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    );
  }
  
  export default AssignTeacherForm;
  
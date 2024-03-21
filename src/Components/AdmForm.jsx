import React, { useEffect, useState } from 'react';
import {  Box, TextField, Button, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import REACT_API_URL from '../config';
import logo from "../assets/logo2.png";
const AdmForm = () => {
    const initialData = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNum: '',
      }
  const [formData, setFormData] = useState(initialData);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${REACT_API_URL}/admissions`, formData);
      if (response) {
        setSuccess(true);
        setLoading(false);
        setAlertMessage('Admission form submitted successfully');
      }
      setFormData(initialData);
      console.log('API Response:', response.data);
    //   setTimeout(() => {
    //     ; // Close the modal after 4 seconds
    //   }, 4000);
    } catch (error) {
      console.error('Error:', error);
      setError(true);
      setAlertMessage('Admission submission unsuccessful, please try again');
    }
  };
  useEffect(() => {
    let alertTimer;
    if (error || success) {
      alertTimer = setTimeout(() => {
        setError(false);
        setSuccess(false);
        ;
      }, 5000); // Show alert for 5 seconds
    }
    return () => clearTimeout(alertTimer);
  }, [error, success]);
  return (
  
      <Box
      sx={{ p: 5, maxWidth: 'sm', margin: 'auto', textAlign: 'center' }}
      >
     <Box
            component="img"
            src={logo}
            href="/"
            sx={{
              m: 'auto',
            //   display: { xs: "none", md: "flex" },
              width: "15%",
            }}
          />
        {loading ? (
          <CircularProgress />
        ) : (
          <Box my={2}>
             
            <h1 id="registration-modal" style={{textAlign:'center'}}>Admission Form</h1>
            <form onSubmit={handleSubmit}>
              <TextField size='small'
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField size='small'
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField size='small'
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField size='small'
                type="text"
                label="Phone Number"
                name="phoneNum"
                value={formData.phoneNum}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <Button sx={{my:3}} type="submit" variant="contained" color="primary" fullWidth>
                Register
              </Button>
            </form>
            {error && (
              <Alert sx={{my:2}} severity="error" onClose={() => {setError(false);}}>
                {alertMessage}
              </Alert>
            )}
            {success && (
              <Alert severity="success"  sx={{my:2}} onClose={() => setSuccess(false)}>
                {alertMessage}
              </Alert>
            )}
          </Box>
        )}
      </Box>

  );
};

export default AdmForm;



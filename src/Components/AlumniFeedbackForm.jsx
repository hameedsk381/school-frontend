import React, { useState } from 'react';
import { Alert, Button, Container, FormControl, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography, CircularProgress, FormControlLabel } from '@mui/material';
import REACT_API_URL from '../config';
import axios from 'axios';
import Swal from 'sweetalert2';

const AlumniFeedbackForm = ({onClose}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    emailAddress: '',
    passedOutBatch: '',
    currentPosition: '',
    maritalStatus: '',
    anythingToShare: '',
    isVisiting: 'no', 
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState({});
  const [load, setLoad] = useState(false);
  const [err, setError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmitting(true);
  
    const submitData = {
      fullName: formData.fullName,
      mobileNumber: formData.mobileNumber,
      emailAddress: formData.emailAddress,
      passedOutBatch: formData.passedOutBatch,
      currentPosition: formData.currentPosition,
      maritalStatus: formData.maritalStatus,
      anythingToShare: formData.anythingToShare,
      isVisiting: formData.isVisiting,
    };
  
    try {
      setLoad(true);
  
      // Assuming your backend API endpoint is '/alumni'
      const response = await axios.post(`${REACT_API_URL}/alumni`, submitData);
  
      setLoad(false);
  
      if (response.status === 200) {
        Swal.fire(response.data.message);
        onClose()
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${response.data.message}`,
        });
      }
  
      // setInterval(() => {
      //   window.location.reload();
      // }, 3000);
    } catch (error) {
      setLoad(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while submitting the form. Please try again.',
      });
      console.error('Error submitting form:', error);
    }
  };
  

  const validate = (values) => {
    let errors = {};
    if (!values.fullName) {
      errors.fullName = 'Full Name is required';
    }
    if (!values.mobileNumber) {
      errors.mobileNumber = 'Mobile Number is required';
    } else if (!/^\d{10}$/.test(values.mobileNumber)) {
      errors.mobileNumber = 'Invalid mobile number format';
    }
    if (!values.emailAddress) {
      errors.emailAddress = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.emailAddress)) {
      errors.emailAddress = 'Invalid email address';
    }
    if (!values.passedOutBatch) {
      errors.passedOutBatch = 'Passed Out Batch is required';
    }
    if (!values.currentPosition) {
      errors.currentPosition = 'Current Position is required';
    }
    if (!values.maritalStatus) {
      errors.maritalStatus = 'Marital Status is required';
    }
    if (!values.anythingToShare) {
      errors.anythingToShare = 'Please share something';
    }
    return errors;
  };

  if (load) {
    return (
      <CircularProgress
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px',
          marginInline:"50%",overflow:"hidden"
        }}
      />
    );
  }

  if (err) {
    return (
      <Alert
        severity="error"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px',
          color: 'red',
        }}
      >
        <Typography variant="h6">{err}</Typography>
      </Alert>
    );
  }

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Stack spacing={2}>
          <TextField
            size="small"
            fullWidth
            required
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={formErrors.fullName && isSubmitting}
            helperText={formErrors.fullName && isSubmitting && formErrors.fullName}
            margin="normal"
          />
          <TextField
            size="small"
            fullWidth
            required
            label="Mobile Number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            error={formErrors.mobileNumber && isSubmitting}
            helperText={formErrors.mobileNumber && isSubmitting && formErrors.mobileNumber}
            margin="normal"
          />
          <TextField
            size="small"
            fullWidth
            required
            label="Email Address"
            name="emailAddress"
            type="email"
            value={formData.emailAddress}
            onChange={handleChange}
            error={formErrors.emailAddress && isSubmitting}
            helperText={formErrors.emailAddress && isSubmitting && formErrors.emailAddress}
            margin="normal"
          />
          <TextField
            size="small"
            fullWidth
            required
            label="Passed Out Batch"
            name="passedOutBatch"
            value={formData.passedOutBatch}
            onChange={handleChange}
            error={formErrors.passedOutBatch && isSubmitting}
            helperText={formErrors.passedOutBatch && isSubmitting && formErrors.passedOutBatch}
            margin="normal"
          />
          <TextField
            size="small"
            fullWidth
            required
            label="Current Position"
            name="currentPosition"
            value={formData.currentPosition}
            onChange={handleChange}
            error={formErrors.currentPosition && isSubmitting}
            helperText={formErrors.currentPosition && isSubmitting && formErrors.currentPosition}
            margin="normal"
          />
          <FormControl component="fieldset" fullWidth margin="normal">
            <FormLabel component="legend">Marital Status</FormLabel>
            <RadioGroup
              row
              aria-label="Marital Status"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
            >
              <FormControlLabel value="single" control={<Radio />} label="Single" />
              <FormControlLabel value="married" control={<Radio />} label="Married" />
            </RadioGroup>
          </FormControl>
          <TextField
            size="small"
            fullWidth
            required
            label="Your thoughts about the school.."
            name="anythingToShare"
            value={formData.anythingToShare}
            onChange={handleChange}
            error={formErrors.anythingToShare && isSubmitting}
            helperText={formErrors.anythingToShare && isSubmitting && formErrors.anythingToShare}
            multiline
            rows={4}
            margin="normal"
          />
          <FormControl component="fieldset" fullWidth margin="normal">
            <FormLabel component="legend">Confirm your participation for Alumni meet on Jan 14</FormLabel>
            <RadioGroup
              row
              aria-label="Are you visiting?"
              name="isVisiting"
              value={formData.isVisiting}
              onChange={handleChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <Button variant="contained" color="primary" type="submit" sx={{ my: 2 }}>
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default AlumniFeedbackForm;

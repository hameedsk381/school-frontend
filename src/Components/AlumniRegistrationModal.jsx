import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Modal, Box, Typography, TextField, Button, Alert } from '@mui/material';
import AlumniFeedbackForm from './AlumniFeedbackForm';

function AlumniRegistrationModal({open,onClose}) {
    
    const [formData, setFormData] = useState({ name: '', email: '', graduationYear: '' });
    const [formErrors, setFormErrors] = useState({});

    const mutation = useMutation(data => {
        return axios.post('/api/alumni/register', data);
    });


    const validate = (data) => {
        const errors = {};
        if (!data.name) errors.name = 'Name is required';
        if (!data.email) errors.email = 'Email is required';
        if (!data.graduationYear) errors.graduationYear = 'Graduation year is required';
        // Add more validation as needed
        return errors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFormErrors({ ...formErrors, [e.target.name]: '' }); // Reset error on change
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate(formData);
        if (Object.keys(errors).length === 0) {
            mutation.mutate(formData, {
                onSuccess: () => {
                   onClose();
                    // Handle success
                },
                onError: (error) => {
                    // Handle error
                }
            });
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <div>
           
            <Modal open={open} onClose={onClose} >
                {/* <Box p={4} bgcolor="white" maxWidth={'25%'} marginY={'7rem'} marginX={'40%'} minWidth={'160px'} borderRadius={2}>
                    <Typography variant="h6" marginBottom={2}>Alumni Registration</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth size='small' margin="normal" label="Name" name="name" value={formData.name} onChange={handleChange} error={!!formErrors.name} helperText={formErrors.name || ''} />
                        <TextField fullWidth size='small' margin="normal" label="Email" name="email" value={formData.email} onChange={handleChange} error={!!formErrors.email} helperText={formErrors.email || ''} />
                        <TextField fullWidth size='small' margin="normal" label="Graduation Year" name="graduationYear" value={formData.graduationYear} onChange={handleChange} error={!!formErrors.graduationYear} helperText={formErrors.graduationYear || ''} />
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Submit</Button>
                    </form>
                    {mutation.isError ? <Alert severity="error">{mutation.error.message}</Alert> : null}
                    {mutation.isSuccess ? <Alert severity="success">Registration successful!</Alert> : null}
                </Box> */}
                <AlumniFeedbackForm/>
            </Modal>
        </div>
    );
}

export default AlumniRegistrationModal;

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Modal, Box, Typography, TextField, Button, Alert, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import AlumniFeedbackForm from './AlumniFeedbackForm';
import AdmForm from './AdmForm';


function AlumniRegistrationModal({open,onClose}) {
    


 


  

    return (
        <div>
           
           <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle >Alumni Registration Form </DialogTitle>
      <DialogContent><AdmForm/></DialogContent>
      <Button onClick={onClose} color="primary" sx={{my:2}}>
        Close
      </Button>
    </Dialog>
        </div>
    );
}

export default AlumniRegistrationModal;

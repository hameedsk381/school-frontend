import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { AttachFile as AttachFileIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios'; // Import Axios for HTTP requests
import REACT_API_URL from '../config';
import { useSelector } from 'react-redux';

const MaterialUploadForm = ({ open, handleClose }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const loginstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = loginstate;
  const currentteachingclasses = currentUser.classesTeaching;
  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };

  const handleDeleteFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };
  const handleChange = (e) => {
    setSelectedClass(e.target.value);
  };
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://reanarration-fastify-api.vercel.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;  
    } catch (error) {
      console.error('Failed to upload image', error);
      throw new Error('Failed to upload image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fileLocations = await Promise.all(files.map((file) => handleImageUpload(file)));

      // Assuming 'submitMaterial' is an API function that submits form data and file locations
      await submitMaterial({ title, subject, selectedClass, fileLocations });

      setLoading(false);
      setSnackbarOpen(true);
      setSnackbarMessage('Material uploaded successfully!');

      // Close the dialog after 3 seconds
      setTimeout(() => {
        setSnackbarOpen(false);
        handleClose();
      }, 3000);
    } catch (error) {
      console.error('Upload failed:', error);
      setLoading(false);
      setSnackbarOpen(true);
      setSnackbarMessage('Failed to upload material.');
    }
  };

  const submitMaterial = async (formData) => {
    try {
      // Simulated API call to submit form data and file locations; replace with actual API call
      const response = await fetch(`${REACT_API_URL}/material/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit material');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Material</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <FormControl fullWidth sx={{mt:2}}>
                <InputLabel>Title</InputLabel>
                <Input
                  fullWidth
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
            <InputLabel id="department-label">Subject</InputLabel>
            <Select size='small'
              labelId="department-label"
              value={currentUser.department}
              label="Subject"
              readOnly
            >
              <MenuItem value={currentUser.department}>{currentUser.department}</MenuItem>
            </Select>
          </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl size="small" fullWidth margin="normal">
            <InputLabel>Choose class</InputLabel>
            <Select size='small'
              name="class"
              value={selectedClass}
              onChange={handleChange}
              label="Classes Teaching"
            >
              {currentteachingclasses.map((item, i) => (
                <MenuItem key={i} value={item._id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Input
                type="file"
                onChange={handleFileChange}
                inputProps={{
                  multiple: true,
                  accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.png,.jpg,.jpeg',
                }}
                sx={{ display: 'none' }}
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<AttachFileIcon />}
                >
                  Choose Files
                </Button>
              </label>
            </Grid>
            {files.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Uploaded Files:
                </Typography>
                {files.map((file, index) => (
                  <Grid container alignItems="center" key={index}>
                    <Grid item xs={10}>
                      <Typography>{file.name}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton onClick={() => handleDeleteFile(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading || files.length === 0 || !title.trim() || !subject || !selectedClass}
        >
          {loading ? <CircularProgress size={24} /> : 'Upload'}
        </Button>
      </DialogActions>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default MaterialUploadForm;

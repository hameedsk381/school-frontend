import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip, Input, IconButton, Container, Grid, Paper, Stack, CircularProgress } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Close, CloseOutlined } from '@mui/icons-material';
import REACT_API_URL from '../config';
const predefinedLanguages = ['English', 'Spanish', 'French', 'German', 'Chinese'];
const predefinedDepartments = ["english", "play school", "science", "telugu", "hindi", "physical education", "mathematics", "office", "computer", "non-teaching"]
function RegistrationForm() {
    const [teacherData, setTeacherData] = useState({
        name: '',
        email: '',
        password: '',
        regId: '',
        department: '',
        contact: '',
        qualifications: '',
        additionalTeachingClasses: ''
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [allClasses, setAllClasses] = useState([]); // Stores all fetched classes
const [selectedClasses, setSelectedClasses] = useState([]); // Stores the selected class IDs
const [additionalselectedClasses, setAdditionalSelectedClasses] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
const [load,setLoad] = useState(false)
    const handleChange = (event) => {
      setTeacherData({ ...teacherData, [event.target.name]: event.target.value });
  };
  const fetchClasses = async ()=>{
    axios.get(`${REACT_API_URL}/api/classes`)
    .then(response => {
        setAllClasses(response.data); // Assuming the API returns an array of class objects
    })
    .catch(error => {
        console.error('Error fetching classes:', error);
        setSnackbarMessage('Failed to fetch classes');
        setIsError(true);
        setOpenSnackbar(true);
    });
  }
  useEffect(() => {
  fetchClasses()
}, []);

  const handleLanguagesChange = (event) => {
      setLanguages(event.target.value);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) { // 5 MB limit
            setSnackbarMessage('Error: Image size should be less than 5MB');
            setIsError(true);
            setOpenSnackbar(true);
        } else {
            const fileUrl = URL.createObjectURL(file);
            setImagePreviewUrl(fileUrl);
            setProfilePicture(file);
            if (openSnackbar) {
                setOpenSnackbar(false); // Close snackbar if open
            }
        }
    }
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
      console.log(response.data)
      return response.data;  // Assuming API response contains the URL of the uploaded file
  } catch (error) {
      console.error('Failed to upload image', error);
      throw new Error('Failed to upload image');
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  
  // Simple client-side validation example
  if (!teacherData.email.includes('@')) {
      setSnackbarMessage('Invalid email address. Please enter a valid email.');
      setIsError(true);
      setOpenSnackbar(true);
      return;
  }

  const formData = new FormData();
  Object.keys(teacherData).forEach(key => {
      formData.append(key, teacherData[key]);
  });
  formData.append('languages', languages.join(', '));
  setLoad(true);
  if (profilePicture) {
    try {
        const imageUrl = await handleImageUpload(profilePicture);
        setTeacherData({ ...teacherData, profilePicture: imageUrl });
    } catch (error) {
        setSnackbarMessage(error.message || 'Failed to upload profile picture!');
        setIsError(true);
        setOpenSnackbar(true);
        return;
    }
}
const finalData = { ...teacherData, languages: languages.join(','),classesTeaching: selectedClasses,additionalclassesTeaching: additionalselectedClasses };

  try {
   
   const response =    await axios.post('http://localhost:5000/management/register', finalData);
   console.log(response.data)
      console.log(finalData)
      setSnackbarMessage('Registration successful!');
      setIsError(false);
      setOpenSnackbar(true);
      setLoad(false);
      setTeacherData({
        name: '',
        email: '',
        password: '',
        regId: '',
        department: '',
        contact: '',
        qualifications: '',additionalTeachingClasses:''
    })
    setProfilePicture(null);
    setImagePreviewUrl('');
    setLanguages([])
      // Reset form fields
  } catch (error) {
      setSnackbarMessage(error.response.data.message || 'Registration failed!');
      setIsError(true);
      setOpenSnackbar(true);
      setLoad(false)
  }
};
const handleClassSelectionChange = (event) => {
  const {
      target: { value },
  } = event;
  setSelectedClasses(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
  );
};
const handleadditionalClassSelectionChange = (event) => {
    const {
        target: { value },
    } = event;
    setAdditionalSelectedClasses(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
    );
  };
  
if(load){
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </div>
  );
}
return (
  <Container maxWidth='md' component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
    <Paper elevation={3} sx={{p:3,mt:4}}>
    <Typography variant="h4" textAlign={'left'} mt={2} gutterBottom>Teacher Registration</Typography>
      <Grid container spacing={2}>
          <Grid item xs={6}>
              <TextField size='small'
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={teacherData.name}
                  onChange={handleChange}
              />
          </Grid>
          <Grid item xs={6}>
              <TextField size='small'
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={teacherData.email}
                  onChange={handleChange}
              />
          </Grid>
          <Grid item xs={6}>
              <TextField size='small'
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={teacherData.password}
                  onChange={handleChange}
              />
          </Grid>
          <Grid item xs={6}>
              <TextField size='small'
                  margin="normal"
                  required
                  fullWidth
                  id="regId"
                  label="Registration ID"
                  name="regId"
                  autoComplete="registration-id"
                  value={teacherData.regId}
                  onChange={handleChange}
              />
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth>
              <InputLabel id="department-label">Department</InputLabel>
              <Select variant='standard'
                  labelId="department-label"
                  id="department"
                  name="department"
                  value={teacherData.department}
                  onChange={handleChange}
              >
                  {predefinedDepartments.map((department) => (
                      <MenuItem key={department} value={department}>
                          {department}
                      </MenuItem>
                  ))}
              </Select>
          </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth sx={{ mt: 2 }}>
    <InputLabel id="classes-teaching-label">Classes Teaching</InputLabel>
    <Select
        labelId="classes-teaching-label"
        multiple size='small'
        value={selectedClasses}
        onChange={handleClassSelectionChange}
        input={<OutlinedInput id="select-multiple-classes" label="Classes Teaching" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              { selected.map(id => allClasses.find(cls => cls._id === id)?.name).join(', ')}
          </Box>
      )}
    > 
        {allClasses.map((cls) => (
            <MenuItem key={cls._id} value={cls._id}>
                {cls.name}
            </MenuItem>
        ))}
    </Select>
</FormControl>

          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth sx={{ mt: 2 }}>
    <InputLabel id="classes-teaching-label">Additional Classes Teaching</InputLabel>
    <Select
        labelId="classes-teaching-label"
        multiple size='small'
        value={additionalselectedClasses}
        onChange={handleadditionalClassSelectionChange}
        input={<OutlinedInput id="select-multiple-classes" label="Classes Teaching" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              { selected.map(id => allClasses.find(cls => cls._id === id)?.name).join(', ')}
          </Box>
      )}
    > 
        {allClasses.map((cls) => (
            <MenuItem key={cls._id} value={cls._id}>
                {cls.name}
            </MenuItem>
        ))}
    </Select>
</FormControl>

          </Grid>
          <Grid item xs={6}>
              <TextField size='small'
                  margin="normal"
                  required
                  fullWidth
                  id="contact"
                  label="Contact Number"
                  name="contact"
                  type="tel"
                  autoComplete="tel"
                  value={teacherData.contact}
                  onChange={handleChange}
              />
          </Grid>
          <Grid item xs={6}>
              <TextField size='small'
                  margin="normal"
                  required
                  fullWidth
                  id="qualifications"
                  label="Qualifications"
                  name="qualifications"
                  autoComplete="qualifications"
                  value={teacherData.qualifications}
                  onChange={handleChange}
              />
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo-multiple-chip-label">Languages</InputLabel>
          <Select size='small'
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={languages}
              onChange={handleLanguagesChange}
              input={<OutlinedInput id="select-multiple-chip" label="Languages" />}
              renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                          <Chip key={value} label={value} />
                      ))}
                  </Box>
              )}
          >
              {predefinedLanguages.map((language) => (
                  <MenuItem key={language} value={language}>
                      {language}
                  </MenuItem>
              ))}
          </Select>
      </FormControl>
          </Grid>
          <Grid item xs={12}>
   <Stack direction={'row'} spacing={5}>
{!imagePreviewUrl && 
   <Box>
   <InputLabel htmlFor="icon-button-file">Upload Profile Picture</InputLabel>
    <Input
        accept="image/*"
        id="icon-button-file"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
    />
    <label htmlFor="icon-button-file">
        <IconButton color="primary" component="span">
            <PhotoCamera />
        </IconButton>
    </label>
   </Box>}
   {imagePreviewUrl && (
  
        
        <Box sx={{
            position: 'relative',
            width: '200px',  // Define the width explicitly for consistent sizing
            height: '200px', // Define the height explicitly for consistent sizing
            my: 2,
         
            borderColor: 'grey.300'
        }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Profile Picture Preview:</Typography>
            {imagePreviewUrl && (
                <>
                    
                    <img src={imagePreviewUrl} alt="Profile" style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',marginBottom:'5px'
                    }} />
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 8, // Adjust top position
                            right: 8, // Adjust right position
                            color: 'grey.800',
                            backgroundColor: 'common.white', // Adding a white background
                            '&:hover': {
                                backgroundColor: 'grey.300', // Change color on hover for better UI feedback
                            },
                            borderRadius: '50%', // Makes the button rounded
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)', // Adds shadow for better visibility
                            mt:3
                        }}
                        onClick={() => {
                            setImagePreviewUrl('');
                            setProfilePicture(null); // Ensure to clear the file state as well
                        }}
                    >
                        <CloseOutlined />
                    </IconButton>
                </>
            )}
        </Box>
        
    )}
   </Stack>
</Grid>


      </Grid>
     
 
      <Button type="submit"  variant="contained" sx={{ mt: 5, mb: 2 }}>Register</Button>
    </Paper>
      {openSnackbar && (
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
              <Alert severity={isError ? 'error' : 'success'} sx={{ width: '100%' }}>{snackbarMessage}</Alert>
          </Snackbar>
      )}
  </Container>
);
}

export default RegistrationForm;




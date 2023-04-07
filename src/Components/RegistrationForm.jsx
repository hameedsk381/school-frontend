import React, { useState } from 'react';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  Button,
  FormControl,
  FormHelperText,
  Avatar,
  Container,
  Stack,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import styled from '@emotion/styled';
import logo from "../assets/logo2.png";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/userActions';
const useStyles = styled((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: theme.spacing(2),
  },
}));

const RegistrationForm = () => {
  const regstate = useSelector((state) => state.registerUserReducer);
  const { error, loading, success } = regstate;
  const dispatch = useDispatch();
  const classes = useStyles();
const [status,setStatus] =  useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    registrationId: '',
    profilePicture: null,
    termsAndConditions: false,
    department: '',
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        profilePicture: files[0],
      }));

      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
    const submitdata = new FormData()
    submitdata.append("name",formData.name)
    submitdata.append("regId",formData.registrationId)
    submitdata.append("email",formData.email)
    submitdata.append("department",formData.department)
    
    submitdata.append("password",formData.password)
    submitdata.append("profileimg",formData.profilePicture)
    console.log(submitdata)
    alert("Registration complete")
    setInterval(()=>{
window.location.reload()
    },2000)
   
  setStatus(true)
    dispatch(registerUser(submitdata));
  };

  const isPasswordMatch = formData.password === formData.confirmPassword;

  return (
    <Box>
    
 <Container   sx={{width:"33%",my:3,p:2}}>
 {success && (<Alert severity="success">Registration Successfull</Alert>)}
    {error && (<Alert severity="error">Invalid credentitals</Alert>)}
    {loading && (<CircularProgress />)}
<Box component={'img'} src={logo} sx={{margin:"auto",width:60,height:80}}/>
<form onSubmit={handleSubmit}>
 <Typography variant='h4' my={2} textAlign={'center'}>Registration form</Typography>
 <Stack spacing={2}>
 <TextField
 required
 fullWidth
 margin="normal"
 label="Name"
 name="name"
 value={formData.name}
 onChange={handleChange}
/>

<TextField
 required
 fullWidth
 margin="normal"
 label="Email"
 type="email"
 name="email"
 value={formData.email}
 onChange={handleChange}
/>

<TextField
 required
 fullWidth
 margin="normal"
 label="Password"
 type="password"
 name="password"
 value={formData.password}
 onChange={handleChange}
/>

<TextField
 required
 fullWidth
 margin="normal"
 label="Confirm Password"
 type="password"
 name="confirmPassword"
 value={formData.confirmPassword}
 onChange={handleChange}
 error={!isPasswordMatch}
 helperText={!isPasswordMatch && 'Passwords do not match'}
/>

<TextField
 required
 fullWidth
 margin="normal"
 label="Registration ID"
 name="registrationId"
 value={formData.registrationId}
 onChange={handleChange}
/>

<FormControl required fullWidth margin="normal">
 <InputLabel>Department</InputLabel>
 <Select
   name="department"
   value={formData.department}
   onChange={handleChange}
   className={classes.selectEmpty}
 >
   <MenuItem value="english">English</MenuItem>
   <MenuItem value="telugu">Telugu</MenuItem>
   <MenuItem value="hindi">Hindi</MenuItem>
   <MenuItem value="maths">Maths</MenuItem>
   <MenuItem value="science">Science</MenuItem>
   <MenuItem value="social">Social</MenuItem>
 </Select>
 </FormControl>

 <input
   accept="image/*"
   id="profile-picture"
   type="file"
   name="profilePicture"
   onChange={handleChange}
   style={{ display: 'none' }}
 />

 <label htmlFor="profile-picture">
   <Button
     variant="contained"
     color="primary"
     component="span"
     fullWidth
     className={classes.submitButton}
   >
     Upload Profile Picture
   </Button>
 </label>

 {previewImage && (
   <Avatar
   variant='square'
     src={previewImage}
     alt="Profile Picture"
     
     sx={{margin:"auto",width:100,height:80}}
   />
 )}

 <FormControlLabel
   control={
     <Checkbox
       name="termsAndConditions"
       checked={formData.termsAndConditions}
       onChange={handleChange}
       color="primary"
     />
   }
   label="I agree to the terms and conditions"
 />

 <Button
   variant="contained"
   color="primary"
   type="submit"
   disabled={!isPasswordMatch || !formData.termsAndConditions}
   className={classes.submitButton}
 >
   Register
 </Button>
 </Stack>
 </form>
</Container>
      </Box>
      
      );
      };
      
      export default RegistrationForm;

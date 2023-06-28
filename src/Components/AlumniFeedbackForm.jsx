

import { UploadFile } from "@mui/icons-material";
import { Alert, Avatar, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";

import { useState } from "react";
import REACT_API_URL from "../config";
import axios from "axios";
import Swal from "sweetalert2";

const AlumniFeedbackForm = () => {
  
    const [formData, setFormData] = useState({
    name: '',
    email:'',
    fathersName: '',
    mothersName: '',
    teachersName: '',
    lastClassStudied: '',
    yearOfPassing: '',
    principalName: '',
    testimony: '',
    image: null,
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [response,setResponse] = useState({});
    const [load,setLoad] = useState(false);
    const [err,setError] = useState(false);
    const handleChange = (event) => {
        const { name, value, type,  files } = event.target;
    
        if (type === "file") {
          setFormData((prevData) => ({
            ...prevData,
            image: files[0],
          }));
    
          setPreviewImage(URL.createObjectURL(files[0]));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
      };
    const submitForm = async(formdata)=>{
try{
  
  await axios.post(`${REACT_API_URL}/alumni`,formdata).then(res=> {setResponse(res)});
} catch(error){
 setError(error);
}
    }
    const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmitting(true);
    const submitdata = new FormData();
    submitdata.append("name", formData.name);
    submitdata.append("fathersName", formData.fathersName);
    submitdata.append("mothersName", formData.mothersName);
    submitdata.append("email", formData.email);
    submitdata.append("teachersName", formData.teachersName);
    submitdata.append("principalName", formData.principalName);
    submitdata.append("testimony", formData.testimony);
    submitdata.append("yearOfPassing", formData.yearOfPassing);
    submitdata.append("lastClassStudied", formData.lastClassStudied);
    submitdata.append("profileimg", formData.image);
    setLoad(true)
submitForm(submitdata);
setLoad(false)
if(response.status === 200){
  Swal.fire(response.data.message)
} else {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: `${response.data.message}`,
    
   
  })
}
setInterval(()=>{
  window.location.reload()
},3000)
    };
    
    const validate = (values) => {
    let errors = {};
    if (!values.name) {
    errors.name = 'Name is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
      }
    if (!values.fathersName) {
    errors.fathersName = "Father's name is required";
    }
    if (!values.mothersName) {
    errors.mothersName = "Mother's name is required";
    }
    if (!values.teachersName) {
    errors.teachersName = "Teacher's name is required";
    }
    if (!values.lastClassStudied) {
    errors.lastClassStudied = 'Last class studied is required';
    }
    if (!values.yearOfPassing) {
    errors.yearOfPassing = 'Year of passing is required';
    } else if (!/^\d{4}$/.test(values.yearOfPassing)) {
    errors.yearOfPassing = 'Invalid year format';
    }
    if (!values.principalName) {
    errors.principalName = "Principal's name is required";
    }
    if (!values.testimony) {
    errors.testimony = 'Testimony is required';
    }
    return errors;
    };
    if (load) {
      return <CircularProgress sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px'
        }} />;
    }
    if (err) {
      return <Alert severity="error" sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px',
          color: 'red'
        }}><Typography variant='h6'>{err}</Typography></Alert>;
    }
    return (
    <Container sx={{width:{md:"50%",lg:"33%"}}}>
    <Paper elevation={3} sx={{p:3}} >
    <Typography textAlign={'center'} variant="h4" gutterBottom>
    Alumni  Form
    </Typography>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
   <Stack spacing={2}>
   <TextField size="small"
   fullWidth
   required
   label="Name"
   name="name"
   value={formData.name}
   onChange={handleChange}
   error={formErrors.name && isSubmitting}
   helperText={formErrors.name && isSubmitting && formErrors.name}
   margin="normal"
   />
   <TextField size="small"
   fullWidth
   required
   label="Email"
   name="email"
   type="email"
   
   value={formData.email}
   onChange={handleChange}
   error={formErrors.email && isSubmitting}
   helperText={formErrors.email && isSubmitting && formErrors.email}
   margin="normal"
   />
   <TextField size="small"
   fullWidth
   required
   label="Father's Name"
   name="fathersName"
   value={formData.fathersName}
   onChange={handleChange}
   error={formErrors.fathersName && isSubmitting}
   helperText={
   formErrors.fathersName && isSubmitting && formErrors.fathersName
   }
   margin="normal"
   />
   <TextField size="small"
   fullWidth
   required
   label="Mother's Name"
   name="mothersName"
   value={formData.mothersName}
   onChange={handleChange}
   error={formErrors.mothersName && isSubmitting}
   helperText={
   formErrors.mothersName && isSubmitting && formErrors.mothersName
   }
   margin="normal"
   />
   <TextField size="small"
   fullWidth
   required
   label="Teacher's Name"
   name="teachersName"
   value={formData.teachersName}
   onChange={handleChange}
   error={formErrors.teachersName && isSubmitting}
   helperText={
   formErrors.teachersName && isSubmitting && formErrors.teachersName
   }
   margin="normal"
   />
   <TextField size="small"
   fullWidth
   required
   label="Principal's Name"
   name="principalName"
   value={formData.principalName}
   onChange={handleChange}
   error={formErrors.principalName && isSubmitting}
   helperText={
   formErrors.principalName && isSubmitting && formErrors.principalName
   }
   margin="normal"
   />
   <TextField size="small"
fullWidth
required
label="Year of Passing"
name="yearOfPassing"
type="number"
min="1980"
max={new Date().getFullYear()}
value={formData.yearOfPassing}
onChange={handleChange}
error={formErrors.yearOfPassing && isSubmitting}
helperText={
formErrors.yearOfPassing && isSubmitting && formErrors.yearOfPassing
}

margin="normal"
sx={{ mb: 2 }}
/>
   <FormControl required fullWidth margin="normal">
  <InputLabel>Last class studied</InputLabel>
   <Select
   variant="standard"
     name="lastClassStudied"
     value={formData.lastClassStudied}
     onChange={handleChange}
     
   >
    
   {["LKG","UKG",1,2,3,4,5,6,7,8,9,10].map(item=>(
       <MenuItem value={item} key={item}>{item}</MenuItem>
   ))}
   </Select>
 </FormControl>
 <TextField size="small"
   fullWidth
   required
   label="Testimony"
   name="testimony"
   value={formData.testimony}
   onChange={handleChange}
   variant="outlined"
   margin="normal"
   multiline
   rows={4}
 />
 <input
 accept="image/*"
 id="profile-picture"
 type="file"
 name="profilePicture"
 onChange={handleChange}
 style={{ display: "none" }}
/>

<InputLabel htmlFor="profile-picture">
 <Button
   variant="contained"
   color="primary"
   component="span"

fullWidth
 >
<UploadFile  sx={{mx:2}}/>   Upload Profile Picture
 </Button>
</InputLabel>

{previewImage && (
 <Avatar
   variant="square"
   src={previewImage}
   alt="Profile Picture"
   sx={{ margin: "auto", width: "50%", height: "20%" ,my:2}}
 />
)}

 <Button
   variant="contained"
   color="primary"
   type="submit"
sx={{my:2}}
 >
   Submit
 </Button>
   </Stack>
</form>
</Paper>
</Container>
)}


export default AlumniFeedbackForm;
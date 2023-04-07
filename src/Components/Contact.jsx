import { Textarea } from "@mui/joy";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";

import styled from "@emotion/styled";
import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()
const useStyles = styled((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  formControl: {
    minWidth: 120,
    width: "100%",
  },
  textarea: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const Contact = () => {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({
    name: "",
    relation: "",
    email: "",
    contactNumber: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
const postdata = async(formValues)=>{
 await axios.post(`${process.env.REACT_URL}/api/feedback/contact`,formValues)
}
  const handleSubmit = (event) => {
    event.preventDefault();
    // POST formValues to server
   postdata(formValues)
 
    alert("Thank you for contacting us. we will get back to you")
    window.location.reload()
  };
  return (
    <Container>
      <Box component="div" role="presentation" sx={{ my: 2 }}>
        <Typography variant="h6">Contact</Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>

          <Typography sx={{ color: "#757ce8" }}>Contact</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container  sx={{ my: 3 }} spacing={2}>
      
       <Grid item xs={12} md={6}>
       <Box
       
       sx={{ p: 2, bgcolor: "#2196f3", color: "white", height: "100%" }}
     >
       <Typography variant="h4" fontFamily="-moz-initial">
         {" "}
         Christ The King International School{" "}
       </Typography>
       <Stack spacing={1} sx={{ py: 2, textTransform: "capitalize" }}>
         <Typography sx={{ fontSize: { xs: "small", md: "medium" } }}>
           sunnapubatila center, Mogalrajapuram
         </Typography>
         <Typography sx={{ fontSize: { xs: "small", md: "medium" } }}>
           {" "}
           Christurajupuram, Vijayawada{" "}
         </Typography>
         <Typography
           sx={{ fontSize: { xs: "small", md: "medium" } }}
           fontWeight={"bold"}
         >
           Andhra Pradesh{" "}
         </Typography>
         <Typography sx={{ fontSize: { xs: "small", md: "medium" } }}>
           520008
         </Typography>
         <Typography sx={{ fontSize: { xs: "small", md: "medium" } }}>
           Phone :
           <Link underline="none" style={{ color: "white" }}>
             {" "}
             +91 74269857439
           </Link>
         </Typography>
         <Typography sx={{ fontSize: { xs: "small", md: "medium" } }}>
           Email :{" "}
           <Link underline="none" style={{ color: "white" }}>
             {" "}
             Christtheking@gmail.com
           </Link>{" "}
         </Typography>
       </Stack>
     </Box>
       </Grid>
       
       <Grid item xs={12} md={6}>
       <Container className={classes.container}>
       <Typography variant="h4" gutterBottom>
         Contact Us
       </Typography>
       <form onSubmit={handleSubmit}>
         <Stack spacing={2}>
           <TextField
             size="small"
             name="name"
             label="Full Name"
             variant="outlined"
             required
             margin="normal"
             value={formValues.name}
             onChange={handleChange}
           />
           <FormControl
             size="small"
             variant="outlined"
             className={classes.formControl}
           >
             <InputLabel id="relation-with-student-label">
               Relation with Student
             </InputLabel>
             <Select
               labelId="relation-with-student-label"
               name="relation"
               value={formValues.relation}
               onChange={handleChange}
               label="Relation with Student"
               required
             >
               <MenuItem value="parent">Parent</MenuItem>
               <MenuItem value="student">Student</MenuItem>
               <MenuItem value="teacher">Teacher</MenuItem>
               <MenuItem value="media">Media</MenuItem>
               <MenuItem value="vendor">Vendor</MenuItem>
               <MenuItem value="other">Other</MenuItem>
             </Select>
           </FormControl>
           <TextField
             size="small"
             name="email"
             label="Email"
             variant="outlined"
             required
             margin="normal"
             value={formValues.email}
             onChange={handleChange}
             type="email"
           />
           <TextField
             size="small"
             name="contactNumber"
             label="Contact Number"
             variant="outlined"
             required
             margin="normal"
             value={formValues.contactNumber}
             onChange={handleChange}
             type="tel"
           />
           <Textarea
             name="message"
             placeholder="Message"
             className={classes.textarea}
             rowsMin={6}
             value={formValues.message}
             onChange={handleChange}
             style={{ fontFamily: "fantasy", height: 100 }}
           />
           <Button
             type="submit"
             variant="contained"
             color="primary"
             className={classes.submitButton}
           >
             Submit
           </Button>
         </Stack>
       </form>
     </Container>
       </Grid>
        
     
       
      </Grid>
    </Container>
  );
};

export default Contact;

import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import logo from "../assets/logo2.png";
import { registerUser } from "../actions/userActions";
import { Alert, CircularProgress, Input } from "@mui/material";
import CommonForm from "./common_components/CommonForm";

const theme = createTheme();

export default function SignUp() {
  const [department, setDepartment] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [regId, setregId] = React.useState("");
  const [name, setname] = React.useState("");
  const [image,setImage] = React.useState("");
  const [password, setPassword] = React.useState("");
  const regstate = useSelector((state) => state.registerUserReducer);
  const { error, loading, success } = regstate;
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("name",name)
    formData.append("regId",regId)
    formData.append("email",email)
    formData.append("department",department)
    
    formData.append("password",password)
    formData.append("profileimg",image)
  
   
    dispatch(registerUser(formData));
  };
  const fields = [
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      registrationId: "",
    },
    {
      name: {
        type: "text",
        label: "Name",
        requiredMsg: "Name is required",
      },
      email: {
        type: "email",
        label: "Email",
        requiredMsg: "Email is required",
        invalidMsg: "Email is invalid",
      },
      password: {
        type: "password",
        label: "Password",
        requiredMsg: "Password is required",
        minLengthMsg: "Password must be at least 6 characters",
      },
      confirmPassword: {
        type: "password",
        label: "Confirm Password",
        requiredMsg: "Confirm Password is required",
        matchMsg: "Passwords do not match",
      },
      role: {
        type: "select",
        label: "Role",
        options: [
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
        ],
        requiredMsg: "Role is required",
      },
      registrationId: {
        type: "text",
        label: "Registration ID",
        requiredMsg: "Registration ID is required",
      },
    },
  ];

  // const register = async()=>{

  //   const user = {
  //     email,password,regId,department,name
  //   }
  //    await axios.post("http://localhost:5000/api/users/register",user).then(res=>console.log(res.data))
  // }

  return (

      <Container component="main" maxWidth="xs">
      <CommonForm fields={fields} onSubmit/>
      
        <Box
          sx={{
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
        {loading && !success && !error && ( <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>)}
      {success && (<Alert severity="success">User created successfully</Alert>)}
      {error && (<Alert severity="error">Error</Alert>)}
          <Box
           
            component="img"
            src={logo}
            href="/"
            sx={{
              m: 2,
              display: { xs: "none", md: "flex" },
              width: "20%",
            }}
          />
          <Typography component="h1" variant="h5">
            Registration Form
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2} sx={{ width: { xs: 320, md: 480 } }}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  autoFocus
                  value={name}
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="reg_id"
                  label="Registration Id"
                  name="reg_id"
                  autoComplete="reg_id"
                  value={regId}
                  onChange={(e) => {
                    setregId(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ minWidth: { xs: 307, md: 464 } }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Department
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    name="department"
                    id="department"
                    value={department}
                    onChange={(event) => {
                      setDepartment(event.target.value);
                    }}
                    autoWidth
                    label="Department"
                  >
                    {[
                      "English",
                      "Telugu",
                      "Hindi",
                      "Maths",
                      "Science",
                      "Social",
                      "Moral Science",
                      "Sports",
                    ].map((item, i) => (
                      <MenuItem
                        key={i}
                        value={item}
                        sx={{ width: { xs: 305, md: 464 } }}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
              <Input
                  
                  fullWidth
                  name="profileimg"
                 
                  type="file"
                  id="image"
                  accept='image/*'
                  
               
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
                
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#2196f3" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item sx={{ my: 1 }}>
                <Link
                  href="/login"
                  variant="body2"
                  sx={{ textAlign: "center" }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
 
  );
}

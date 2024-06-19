import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";


import { useDispatch, useSelector } from "react-redux";
import { Alert, CircularProgress } from "@mui/material";
import { loginUser } from "../actions/userActions";
import { Link } from "react-router-dom";
import { logos } from "../assets";

const theme = createTheme();

export default function Login() {
  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const loginstate = useSelector((state) => state.loginUserReducer);
  const { loading, error } = loginstate;

  React.useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    } 
    console.log(error)
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      password,
      email,
    };
    dispatch(loginUser(user));
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" >
        <CssBaseline />
        
        {error && <Alert sx={{marginTop:2}} severity="error">{error} </Alert>}

        <Box
          sx={{
            marginBlock: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={logos.logo2}
            href="/"
            sx={{
              m: 2,
              display: { xs: "none", md: "flex" },
              width: "20%",
            }}
          />
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2} sx={{ width: { xs: 320, md: 480 } }}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth type="email"
                  id="email"
                  label="email"
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
            </Grid>
            
            {loading ? (
              
              <Box sx={{ display: "flex",p:2,marginLeft:{xs:"33%",md:'48%'} }}>
                <CircularProgress />
              </Box>
             
            ): (<Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#2196f3" }}
            >Login</Button>)}
            
            <Typography
              component={Link}
              to="/forgot-password"
              sx={{
                marginLeft: "35%",
                textDecoration: "underline",
                color: "#2196f3",
              }}
            >
              Forgot password?
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import logo from "../assets/logo2.png";
import { useDispatch, useSelector } from "react-redux";
import { Alert, CircularProgress } from "@mui/material";
import { loginUser } from "../actions/userActions";
import { Link } from "react-router-dom";

const theme = createTheme();

export default function Login() {
  const [regId, setregId] = React.useState("");

  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const loginstate = useSelector((state) => state.loginUserReducer);
  const { loading, error } = loginstate;

  React.useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      password,
      regId,
    };
    dispatch(loginUser(user));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        
        {error && <Alert severity="error">Invalid Credentials</Alert>}

        <Box
          sx={{
            marginBlock: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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

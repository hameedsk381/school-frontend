
import { Textarea } from '@mui/joy';
import { Alert, Box, Button, Checkbox, CircularProgress, Container,  FormControlLabel, FormGroup, Grid, Stack, TextField, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { registerUser } from '../actions/userActions';
import logo from "../assets/logo2.png";
const Alumniform = () => {
 
  const [father, setfather] = React.useState("");
  const [mother, setmother] = React.useState("");
  const [lastclass, setlastclass] = React.useState("");
  const [yop, setyop] = React.useState("");
  const [principal, setprincipal] = React.useState("");
  const [teacher, setteacher] = React.useState("");
  const [testimony, settestimony] = React.useState("");
  const [name, setname] = React.useState("");
  const [image,setImage] = React.useState("");

  const regstate = useSelector((state) => state.registerUserReducer);
  const { error, loading, success } = regstate;
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("name",name)
    formData.append("father",father)
    formData.append("mother",mother)
    formData.append("teacher",teacher)
    formData.append("yop",yop)
    formData.append("principal",principal)
    formData.append("profileimg",image)
    formData.append("testimony",testimony)
  
    formData.append("lastclass",lastclass)
  
   
    dispatch(registerUser(formData));
  };
  return (
    <Container component="main" maxWidth="xs">
      
    <Box
      sx={{
        marginBottom: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
    {loading && ( <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>)}
  {success && (<Alert severity="success">User created successfully</Alert>)}
  {error && (<Alert severity="error">Error</Alert>)}
      <Typography
  
        component="img"
        src={logo}
        href="/"
        sx={{
          m: 2,
          display: { xs: "none", md: "flex" },
          width: "20%",
        }}
      />
      <Typography variant='h4' color={"#2196f3"}>Alumni</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2} sx={{ width: { xs: 320, md: 480 } }}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="name"
              required
              fullWidth
              id="name"
              label="Full name"
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
              label="Father name"
              name="email"
              autoComplete="email"
              value={father}
              onChange={(e) => {
                setfather(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Mother name"
            name="email"
            autoComplete="email"
            value={mother}
            onChange={(e) => {
              setmother(e.target.value);
            }}
          />
        </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="reg_id"
              label="Last class you have graduated from cks"
              name="reg_id"
             
              value={lastclass}
              onChange={(e) => {
                setlastclass(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="reg_id"
            label="Year of passing"
            name="reg_id"
           
            value={yop}
            onChange={(e) => {
              setyop(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="reg_id"
          label="principal"
          name="reg_id"
         
          value={principal}
          onChange={(e) => {
            setprincipal(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12}>
      <TextField 
        required
        fullWidth
        id="reg_id"
        label="Class teacher name"
        name="reg_id"
       
        value={teacher}
        onChange={(e) => {
          setteacher(e.target.value);
        }}
      />
      
    </Grid>
       
    <Grid item xs={12}>
    <Textarea
    placeholder="A short testimony (To be displayed on website)"
    required
    size='lg'
    minRows={4}
    maxRows={7}
    sx={{ my: 1,fontFamily:"sans-serif" }}
    value={testimony}
    onChange={(e) => {
        settestimony(e.target.value);
      }}
  />    
  </Grid>
  <Grid item xs={12}>
  <Stack direction={'row'} spacing={2}>
  <Typography variant='h6'>Upload picture : </Typography>
  <TextField
      
     
      name="profileimg"
    size='small'
      type="file"
      id="image"
      accept='image/*'
      
   
      onChange={(e) => {
        setImage(e.target.files[0]);
      }}
    />
  </Stack>
    
  </Grid>
         
        </Grid>
        
        <FormGroup sx={{mt:1}}>
  <FormControlLabel control={<Checkbox required />} label="Agree to terms and conditions*" />

</FormGroup>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: "#2196f3" }}
        >
         Submit
        </Button>
       
      </Box>
    </Box>
  </Container>
  )
}

export default Alumniform
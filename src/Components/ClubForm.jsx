import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import styled from "@emotion/styled";
import { Alert, Box, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { addClubUser, getAllClubUsers } from "../actions/clubActions";
import { logos } from "../assets";

const useStyles = styled((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  input: {
    margin: theme.spacing(1),
    minWidth: "300px",
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const ClubForm = () => {
  const classes = useStyles();
const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [classNum, setClassNum] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [club, setClub] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
          const clubuser = {
            name,classNum,rollNo,club
          }


   
     dispatch(addClubUser(clubuser))
     
      // setInterval(()=>{
      //   window.location.reload()
      // },5000)
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };
  useEffect(() => {
    dispatch(getAllClubUsers())
      
        
      }, [dispatch])
  const clubanmes = useSelector(state => state.getAllClubUsersReducer)
  const {users} = clubanmes;
const submissionstate = useSelector(state=>state.addClubUserReducer);
const {loading,success,error,message} = submissionstate;
if(loading){
  return <CircularProgress/>
}
if(error){
  return <Alert variant="outlined" severity="error">{error}</Alert>
}
if(success){
  return <Alert variant="outlined" severity="success">{message}</Alert>
}

  return (
    <Container sx={{my:5,width:{xs:"100%",md:"50%",lg:"33%"}}}>
    <Box
           
            component="img"
            src={logos.logo2}
            href="/"
            sx={{
              m: 2,
              display: { xs: "none", md: "flex" },
              width: "10%",margin:"auto",my:2
            }}
          />
    <Typography variant="h4" textAlign={'center'} my={3}>Club Registration</Typography>
    <Stack spacing={2} component={'form'} className={classes.form} onSubmit={handleSubmit}>
    <TextField
    id="name"
    label="Name"
    className={classes.input}
    variant="outlined"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
  <FormControl variant="outlined" className={classes.input}>
    <InputLabel id="class-label">Class</InputLabel>
    <Select
      labelId="class-label"
      id="class"
      value={classNum}
      onChange={(e) => setClassNum(e.target.value)}
      label="Class"
    >
      {[...Array(10)].map((_, i) => (
        <MenuItem key={i + 1} value={i + 1}>
          {i + 1}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  <TextField
    id="rollNo"
    label="Roll Number"
    className={classes.input}
    variant="outlined"
    value={rollNo}
    onChange={(e) => setRollNo(e.target.value)}
  />
  <FormControl variant="outlined" className={classes.input}>
    <InputLabel id="club-label">Club</InputLabel>
    <Select
      labelId="club-label"
      id="club"
      value={club}
      onChange={(e) => setClub(e.target.value)}
      label="Club"
    >
      {users.map((option) => (
        <MenuItem key={option._id} value={option.name}>
          {option.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  <Button
    variant="contained"
    color="primary"
    className={classes.button}
    type="submit"
  >
    Submit
  </Button>
    </Stack>
    
    </Container>
  );
};

export default ClubForm;

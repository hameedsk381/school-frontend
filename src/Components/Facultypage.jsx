import {
  Alert,
 
  CircularProgress,
  Container,
  Grid,

} from "@mui/material";

import React, { useEffect, useState } from "react";

import Profilecard from "./Profilecard";
import axios from "axios";
import REACT_API_URL from "../config";

const Facultypage = ({ dept }) => {
  const [depusers, setDepusers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const users = async () => {
    try {
      setLoading(true);
      await axios
        .get(`${REACT_API_URL}/users/${dept}`)
        .then((res) => setDepusers(res.data));
      setLoading(false);
    } catch (error) {
      setErr(err);
    }
  };

  useEffect(() => {
    users();
  }, []);
if(depusers.length === 0){
  return <Alert severity="info" variant="standard">No faculty for this department</Alert>
}
  if (loading) {
    <CircularProgress sx={{ m: "50%" }} />;
  }
  if (err) {
    <Alert severity="error">This is an error alert — check it out!</Alert>;
  }
  return (
    <Container >
      <Grid container spacing={2} sx={{ p: 3 }}>
        {depusers.map((teacher, i) => (
          <Grid item xs={12} lg={3} sx={{ p: 4 }} key={i}>
            <Profilecard data={teacher} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Facultypage;

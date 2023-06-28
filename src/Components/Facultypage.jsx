import React, { useEffect, useState, useMemo } from "react";
import { Alert, CircularProgress, Container, Grid } from "@mui/material";
import Profilecard from "./Profilecard";
import axios from "axios";
import REACT_API_URL from "../config";

const Facultypage = ({ dept }) => {
  const [depusers, setDepusers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${REACT_API_URL}/users/${dept}`);
      setDepusers(res.data);
      setLoading(false);
    } catch (error) {
      setErr(true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const memoizedDepusers = useMemo(() => depusers, [depusers]);

  if (depusers.length === 0) {
    return <CircularProgress />;
  }

  if (loading) {
    return <CircularProgress sx={{ m: "50%" }} />;
  }

  if (err) {
    return (
      <Alert severity="error">This is an error alert — check it out!</Alert>
    );
  }

  return (
    <Container>
      <Grid container spacing={2} sx={{ p: 3 }}>
        {memoizedDepusers.map((teacher, i) => (
          <Grid item xs={12} lg={3} sx={{ p: 4 }} key={i}>
            <Profilecard data={teacher} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Facultypage;

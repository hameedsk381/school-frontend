import React from "react";
import { Container, Grid, Stack } from "@mui/material";
import HomeworkForm from "./HomeworkForm";
import TeacherHomeworks from "./TeacherHomeworks";
import { useSelector } from "react-redux";

const HomeworkDashboard = () => {
  const loginState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = loginState;

  return (
    <Container sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <HomeworkForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <TeacherHomeworks teacherId={currentUser._id} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeworkDashboard;

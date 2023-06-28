import { Container, Box, Typography, Button } from "@mui/material";

import admissionBgImage from "../assets/IMG_1516.JPG";
import styled from "@emotion/styled";

const useStyles = styled((theme) => ({
  root: {
    backgroundImage: `url(${admissionBgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  content: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    maxWidth: 600,
    width: "100%",
    textAlign: "center",
  },
}));

const AdmissionsPage = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container maxWidth="md" className={classes.content}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admissions for 2023-24 academic year are now open!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Apply now to join our diverse community of learners and discover your
          passion for learning.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Apply Now
        </Button>
      </Container>
    </Box>
  );
};

export default AdmissionsPage;

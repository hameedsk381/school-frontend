import { Container, Box, Typography, Button } from "@mui/material";

import styled from "@emotion/styled";
import { logos } from "../assets";
import { Link } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

const useStyles = styled((theme) => ({
  root: {
    backgroundImage: logos.admissionBg,
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
    <Box sx={{my:4,p:3}} className={classes.root}>
      <Container maxWidth="md" className={classes.content} sx={{display:'flex',flexDirection:'column'}}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admissions for 2023-24 academic year are now open!
        </Typography>
        <Typography variant="body1" gutterBottom sx={{mb:4}}>
          Apply now to join our diverse community of learners and discover your
          passion for learning.
        </Typography>
        <Button  variant="contained" color="primary" size="medium" sx={{m:'auto'}} endIcon={<ArrowForward/>}>
          <Link to='/admissionform'>Register here</Link>
        </Button>
      </Container>
    </Box>
  );
};

export default AdmissionsPage;

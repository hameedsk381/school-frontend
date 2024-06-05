import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ListItemText from "@mui/material/ListItemText";

import Typography from "@mui/material/Typography";

import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const User = () => {
  const loginstate = useSelector((state) => state.loginUserReducer);
  const { loading, error, currentUser } = loginstate;
  const user = {
    name: currentUser.name,
    email: currentUser.email,
    department: currentUser.department,
    regId: currentUser.regId,
    profilePicture: currentUser.profilePicture,
    isAdmin: currentUser.isAdmin,
    currentlyTeaching: currentUser.classesTeaching.map(cls => cls.name).join(', '),
    actingClassTeacherFor: currentUser.actingClassTeacherFor,
    contact: currentUser.contact,
    additionalTeachingClasses: currentUser.additionalTeachingClasses,
    additionalTeachingDepartments: currentUser.additionalTeachingDepartments,
    languages: currentUser.languages,
    expertise: currentUser.expertise,
    qualifications: currentUser.qualifications,
  };

  return (
    <>
      <Box
        sx={{ mx: { xs: 0, lg: 25 }, p: 3, height: "100%", color: "#2196f3" }}
      >
        {loading && <CircularProgress />}
        {error && (
          <Alert variant="outlined" severity="error">
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 2, my: 2 }} elevation={2}>
          <Box>
            <Box
              sx={{
                width: "100%",
                height: { xs: 100, lg: 150 },

                opacity: 0.8,
                background:
                  "linear-gradient(to right, #2196f3 ,#2196f3, #2196f3)",
              }}
            />
            <Avatar
              src={`data:image/jpeg;base64,${user.profilePicture}`}
              onClick={() => {
                Swal.fire({
                  title: `${user.name}`,

                  imageUrl: `data:image/jpeg;base64,${user.profilePicture}`,
                  imageWidth: 400,
                  imageHeight: 200,
                  imageAlt: "Custom image",
                });
              }}
              sx={{
                my: { xs: -6, lg: -10 },
                margin: "auto",

                width: { lg: 120, xs: 100 },
                height: { lg: 120, xs: 100 },
                border: "5px solid white",
              }}
            />
            <Stack
              sx={{
                mt: { xs: 7, lg: 11 },
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: 17, lg: 25, textTransform: "capitalize" },
                }}
              >
                {user.name}
              </Typography>
              <Typography
                sx={{ fontWeight: "bold", fontSize: { xs: 14, lg: 18 } }}
                color={grey[600]}
              >
                {user.department} Department
              </Typography>
            </Stack>
            <Container>
              <Button component={Link} variant="contained" to="/homeworkform">
                Add Homework
              </Button>

              <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid item xs={12} sm={6}>
                  <ListItem>
                    <ListItemText primary="Email" secondary={user.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Qualifications"
                      secondary={user.qualifications}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Contact" secondary={user.contact} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Registration ID"
                      secondary={user.regId}
                    />
                  </ListItem>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ListItem>
                    <ListItemText
                      primary="Acting Class Teacher For"
                      secondary={user.actingClassTeacherFor}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Expertise"
                      secondary={user.expertise}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Currently Teaching"
                      secondary={user.currentlyTeaching}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Additional Teaching Departments"
                      secondary={user.additionalTeachingDepartments}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary="Languages"
                      secondary={user.languages}
                    />
                  </ListItem>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default User;

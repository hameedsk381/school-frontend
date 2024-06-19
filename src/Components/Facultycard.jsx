import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Container,
  Grid,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import REACT_API_URL from "../config";

const Facultycard = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${REACT_API_URL}/management/profile/${id}`);
      setUser(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <Box sx={{ mx: { xs: 0, lg: 25 }, px: 3, height: "100%", color: "#2196f3" }}>
        <Paper sx={{ p: 2, my: 2 }} elevation={2}>
          <Box>
            <Box
              sx={{
                width: "100%",
                height: { xs: 100, lg: 150 },
                opacity: 0.8,
                background: "linear-gradient(to right, #2196f3 ,#2196f3, #2196f3)",
              }}
            />
            {loading ? (
              <Skeleton variant="circular" width={150} height={150} sx={{ mx: 'auto', my: { xs: -6, lg: -10 }, border: "5px solid white" }} />
            ) : (
              <Avatar
                variant="circular"
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
                  objectFit: "cover",
                  width: { lg: 150, xs: 100 },
                  height: { lg: 150, xs: 100 },
                  border: "5px solid white",
                }}
              />
            )}
            <Stack
              sx={{
                mt: { xs: 7, lg: 11 },
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              {loading ? (
                <Skeleton width="60%" height={40} />
              ) : (
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: 17, lg: 25, textTransform: "capitalize" },
                  }}
                >
                  {user.name}
                </Typography>
              )}
              {loading ? (
                <Skeleton width="40%" height={30} />
              ) : (
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: 14, lg: 18 },
                    textTransform: "capitalize",
                  }}
                  color={grey[600]}
                >
                  {user.department} Department
                </Typography>
              )}
            </Stack>
          </Box>
          <Container>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={4}>
                <ListItem>
                  {loading ? <Skeleton width="80%" /> : <ListItemText primary="Email" secondary={user.email} />}
                </ListItem>
                <ListItem>
                  {loading ? <Skeleton width="80%" /> : <ListItemText primary="Qualifications" secondary={user.qualifications} />}
                </ListItem>
                <ListItem>
                  {loading ? <Skeleton width="80%" /> : <ListItemText primary="Contact" secondary={user.contact} />}
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={4}>
                <ListItem>
                  {loading ? <Skeleton width="80%" /> : <ListItemText primary="Registration ID" secondary={user.regId} />}
                </ListItem>
                <ListItem>
                  {loading ? <Skeleton width="80%" /> : <ListItemText primary="Languages" secondary={user.languages && user.languages.join(', ')} />}
                </ListItem>
                <ListItem>
                  {loading ? <Skeleton width="80%" /> : <ListItemText primary="Acting Class Teacher For" secondary={user.actingClassTeacherFor || 'None'} />}
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={4}>
                <ListItem>
                  {loading ? <Skeleton width="80%" /> : <ListItemText primary="Currently Teaching" secondary={user.classesTeaching && user.classesTeaching.map(cls => cls.name).join(', ')} />}
                </ListItem>
                <ListItem>
                  {loading ? <Skeleton width="80%" /> : <ListItemText primary="Additional Teaching Classes" secondary={user.additionalclassesTeaching && user.additionalclassesTeaching.map(cls => cls.name).join(', ')} />}
                </ListItem>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Box>
    </>
  );
};

export default Facultycard;

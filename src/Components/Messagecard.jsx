import * as React from "react";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import { Avatar, Breadcrumbs, Container, Grid, Paper } from "@mui/material";

import { Link, useParams } from "react-router-dom";
import principal from "../assets/principal.JPG";
import correspondent from "../assets/correspondent.jpg";
export default function Messagecard() {
  const { id } = useParams();

  return (
    <Container component={Paper} variant="outlined" sx={{ my: 8 }}>
      {id === "Principal" ? (
        <Box>
          <Box component="div" role="presentation" sx={{ my: 2 }}>
            <Typography variant="h5" my={1} color={"#2196f3"}>
              {id}'s Message
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" to="/">
                Home
              </Link>

              <Typography sx={{ color: "#2196f3" }}>Message</Typography>
            </Breadcrumbs>
          </Box>
          
            <Grid container>
              <Grid item xs={12} md={3}>
               
                  <Avatar
                    variant="rounded"
                    src={principal}
                    alt="principal"
                    sx={{ width: "90%", height: "90%" }}
                  />
               
              </Grid>
              <Grid item xs={12} md={9} sx={{ p: 2 }}>
                <Typography
                  variant="h5"
                  color="#2196f3"
                  sx={{
                    display: "inline-flex",
                    fontSize: { xs: 20, md: 25, lg: 26 },
                  }}
                >
                  {id}'s Message
                </Typography>

                <Typography
                  component="p"
                  py={2}
                  sx={{
                    ml: 2,
                    fontFamily: "serif",
                    fontSize: { xs: 18, md: 20, lg: 25 },
                  }}
                >
                  "Christ the King E.M. High School, Christurajapuram,
                  Vijayawada, is celebrating its Silver Jubilee. It is befitting
                  to thank and praise the almighty God for his loving protection
                  and providence all through the past twenty five years"
                </Typography>
              </Grid>
            </Grid>
          
        </Box>
      ) : (
        <Box>
          <Box component="div" role="presentation" sx={{ my: 2 }}>
            <Typography variant="h5" my={1} color={"#2196f3"}>
              {id}'s Message
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" to="/">
                Home
              </Link>

              <Typography sx={{ color: "#2196f3" }}>Message</Typography>
            </Breadcrumbs>
          </Box>
          <Box sx={{ py: 4, height: "100%", bgcolor: "white" }} elevation={3}>
            <Grid container>
              <Grid item xs={12} md={3}>
                <Box
                  elevation={5}
                  sx={{
                    width: { xs: "90%", lg: "60%" },
                    height: "100%",
                    mb: 3,
                    margin: "auto",
                    p: 1,
                  }}
                >
                  <Avatar
                    variant="rounded"
                    src={correspondent}
                    alt="correspondent"
                    sx={{ width: {xs:"100%",md:"120%"}, height: "90%" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={9} sx={{ p: 2 }}>
                <Typography
                  variant="h5"
                  color="#2196f3"
                  sx={{
                    display: "inline-flex",
                    fontSize: { xs: 20, md: 25, lg: 26 },
                  }}
                >
                  {id}'s Message
                </Typography>

                <Typography
                  component="p"
                  py={2}
                  sx={{
                    ml: 2,
                    fontFamily: "serif",
                    fontSize: { xs: 18, md: 20, lg: 25 },
                  }}
                >
                  "Christ the King E.M. High School, Christurajapuram,
                  Vijayawada, is celebrating its Silver Jubilee. It is befitting
                  to thank and praise the almighty God for his loving protection
                  and providence all through the past twenty five years"
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Container>
  );
}

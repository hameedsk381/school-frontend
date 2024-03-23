import * as React from "react";

import Typography from "@mui/material/Typography";
import { Avatar, Box, Grid, Paper } from "@mui/material";
import { FormatQuote } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { logos } from "../assets";

export default function Message({ name, message, role, caption }) {
  return (
    <Box>
      <Paper sx={{ py: 4, height: "100%", bgcolor: "white" }} elevation={5}>
        <Grid container>
          <Grid item xs={12} md={3}>
            <Paper
              elevation={5}
              sx={{
                width: { xs: "90%", lg: "80%" },
                height: "90%",
                mb: 3,
                margin: "auto",
              }}
            >
             {role ==="Principal" ? ( <Avatar
              variant="square"
              src={logos.principal}
              alt="principal"
              sx={{ width: "100%", height: "100%" }}
            />):(
              <Avatar
              variant="square"
              src={logos.correspondent}
              alt="correspondent"
              sx={{ width: "100%", height: "100%" }}
            />
            )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={9} sx={{ p: 2 }}>
           
              <Typography
                variant="h5"
                color="#2196f3"
                sx={{
                  display: "inline-flex",
                  fontSize: { xs: 20, md: 25, lg: 26 },
                }}
              >{role}'s{" "}
                message
              </Typography>{" "}
            
            
            <Typography
              component="p"
              py={2}
              sx={{
                ml: 2,
                fontFamily: "fantasy",
                fontSize: { xs: 15, md: 15, lg: 18 },
              }}
            ><Typography><FormatQuote
            sx={{ fontSize: { xs: 20, md: 40, } }}
            color="primary"
          /></Typography>
              {message}... <Link
          
              to={`/message/${role}`}
              
              style={{ alignItems: "center", margin: "auto", marginLeft: "4px",fontSize:"12px",color:"#2196f3",textDecoration:"underline" }}
            >
              {" "}
              Read more
            </Link>
            </Typography>
           
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

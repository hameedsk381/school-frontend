import * as React from "react";
import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import values from "../assets/values.svg";

export default function Values() {
  return (
    <Box sx={{ flexGrow: 1, width: "100vw",bgcolor:"white",pb:{xs:3,lg:0} }}>
      <Grid
        container
        
       sx={{mt:2,p:{xs:1,md:3}}}
      >
        {[
          { title: "Determination", image: { values } },
          { title: "Dedication", image: { values } },
          { title: "vision", image: { values } },
          { title: "Focus", image: { values } },
        ].map((name, index) => (
          <Grid
            key={index}
            xs={3}
            sm={3}
            md={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            
            sx={{display:"block",alignItems:"center",}}
          >
            <img src={values} alt={name.title} className="img-fluid object-center m-auto w-[65%] h-[100%] md:h-[70%] md:w-[70%]  rounded-3xl px-2 "/>
            <Typography  sx={{fontSize:{xs:9,md:15,lg:30},textAlign:"center",}}>
              {name.title}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

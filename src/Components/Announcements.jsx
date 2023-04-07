import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
 

const Announcements = ({title,content}) => {
  return (
    <>
      <Box  sx={{ borderTop: "1px solid #ffffff" ,backgroundColor:"#fafafa"}}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "cinzel",
            color: "#ffffff",
            textAlign: "center",backgroundColor:"#2196f3",border:"1px solid white",
            p: 1,
          }}
        >
          {title}
        </Typography>
      
        <Button variant="text"  size="small" sx={{ fontSize:{xs:"9px",md:"12px"},backgroundColor:"#fafafa",color:"#2196f3",textAlign:"end",ml:{xs:'240px',md:'220px'}}}>view more.....</Button>
      </Box>
     
    </>
  );
};

export default Announcements;

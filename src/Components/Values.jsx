import * as React from "react";
import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import determination from '../assets/detrmination.svg'
import dedication from "../assets/dedication.svg";
import discipline from "../assets/discipline.svg";
import devotion from "../assets/devotion.svg";
import { animate, motion } from "framer-motion";

const Values = () => {
  const valuesData = [
    { title: "Determination", image: determination },
    { title: "Dedication", image: dedication },
    { title: "Discipline", image: discipline },
    { title: "Devotion", image: devotion },
  ];

  return (
    <Box sx={{ flexGrow: 1, width: "100%", bgcolor: "white",  }}>
      <Grid container sx={{ py: 2, pb: { xs: 1, md: 2 } }}>
        {valuesData.map((value, index) => (
          <Grid
            key={index}
            xs={12}
            sm={6}
            md={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ display: "block", alignItems: "center" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.3 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  px: 2,
                 width:{xs:"100%",md:'80%'}
                }}
              >
              <Typography sx={{mb:2, fontSize: { xs: 15, md: 22, lg: 30 }, textAlign: "center" }}>
              {value.title}
            </Typography>
                <img
                  src={value.image}
                  alt={value.title}
                  style={{color:"Highlight"}}
                  className="img-fluid object-center  m-auto w-[35%] h-[50%] md:h-[40%] md:w-[50%] rounded-3xl px-2"
                />
               
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Values;

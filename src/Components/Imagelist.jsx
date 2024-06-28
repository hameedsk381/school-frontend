import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { carouselimages } from "../assets";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function SchoolGallery() {
  return (
    <Container>
      <Box sx={{ my: 2 }} component="div" role="presentation">
        <Typography variant="h6" component="div">
          Gallery
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/">
            Home
          </Link>
          <Typography sx={{ color: "#757ce8" }}>Gallery</Typography>
        </Breadcrumbs>
      </Box>
      <Typography
        color={"#2196f3"}
        textAlign="center"
        mt={2}
        p={2}
        sx={{
          fontFamily: "-moz-initial",
          fontSize: { xs: 20, md: 30, lg: 40 },
        }}
      >
        Gallery
      </Typography>

      <ImageList
        sx={{ width: "100%", height: "auto" }}
        variant="quilted"
        cols={{ xs: 1, sm: 2, md: 3 }}
        rowHeight={221}
      >
        {carouselimages.map((item, i) => (
          <ImageListItem key={i} cols={item.cols || 1} rows={item.rows || 1}>
            <img
              loading="lazy"
              {...srcset(item.response, 221, item.rows, item.cols)}
              alt={item.title}
              onClick={() => {
                Swal.fire({
                  imageUrl: item.response,
                  imageWidth: 800,
                  imageHeight: 400,
                  imageAlt: "Custom image",
                });
              }}
              style={{ cursor: "pointer", filter: "drop-shadow(8px 8px 10px gray)" }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
}

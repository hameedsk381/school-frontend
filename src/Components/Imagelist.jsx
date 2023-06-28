import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const arrayRange = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Imagelist() {
  // const [img, setImg] = React.useState(null);
  // const [open, setOpen] = React.useState(false);
  // const [pics, setpics] = React.useState([]);
  // const handleClose = () => setOpen(false);
  // React.useEffect(() => {
  //   axios.get(`${REACT_API_URL}/`).then((res) => {
  //     setpics(res.data);
  //   });
  // }, []);
  return (
    <Container>
      <Box sx={{ my: 2 }} component="div" role="presentation">
        <Typography variant="h6">Gallery</Typography>
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
        sx={{ width: "100%", height: "100%" }}
        variant="quilted"
        cols={3}
        rowHeight={221}
      >
        {arrayRange(1455, 1544, 1).map((item, i) => (
          <ImageListItem key={i} cols={item.cols || 1} rows={item.rows || 1}>
            <img
              {...srcset(require(`../assets/IMG_${item}.JPG`))}
              alt={item.title}
              onClick={() => {
                Swal.fire({
                  imageUrl: require(`../assets/IMG_${item}.JPG`),
                  imageWidth: 800,
                  imageHeight: 400,
                  imageAlt: "Custom image",
                });
              }}
              // onClick={() => {
              //   setOpen(true);
              //   setImg(item);
              // }}
              style={{ filter: "drop-shadow(8px 8px 10px gray)" }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
}

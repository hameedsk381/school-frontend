import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Avatar, Paper } from "@mui/material";


export default function Profilecard({ data }) {
  let name = data.name;
  const title = name.toLowerCase().replace(/(^|\s)\S/g, function (firstLetter) {
    return firstLetter.toUpperCase();
  });

  return (
    <Card
  
      variant="outlined"
      sx={{
        width:250,
    height:320,
    p:3,
        transition: "transform .2s",
        ":hover": { transform: "scale(1.2)" },
      }}
     
    >
    <Avatar component={Paper} elevation={3} sx={{height:150,width:150,margin:"auto"}} src={`data:image/jpeg;base64,${data.profilePicture}`}
    title={title}
    alt={title}/>

      <CardContent>
        <Typography
          color={"#2196f3"}
          gutterBottom
          variant="body1"
          component="div"
          textAlign={"center"}
        >
          {title}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" size="small">
          <Link
            size="small"
            sx={{ textTransform: "capitalize" }}
            to={`/user/${data._id}`}
          >
            View profile
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}

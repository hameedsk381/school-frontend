import { FormatQuoteOutlined, Forward } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

import { logos } from "../assets";

const About = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
      <Box
          component="img"
          src={logos.logo2}
          href="/"
          sx={{
            m: 2,
            display: { xs: "none", md: "flex" },
            width: "5%",
            margin: "auto",
            my: 2,
          }}
        />
        {/* <Typography
          variant="h4"
          textAlign={"center"}
          sx={{ display: { xs: "none", md: "flex" }, marginLeft: "35%" }}
        >
          HISTORY OF THE SCHOOL
        </Typography>
        <Typography
          variant="h6"
          textAlign={"center"}
          sx={{ display: { xs: "flex", md: "none" }, marginLeft: "10%" }}
        >
          HISTORY OF THE SCHOOL
        </Typography> */}
        <Stack direction={"row"} justifyContent="center" spacing={2} p={2}>
          <FormatQuoteOutlined color="info" />
          <Typography
            sx={{ fontSize: { xs: 12, md: 25 } }}
            fontFamily={"cinzel"}
            textTransform={"uppercase"}
            textAlign={"center"}
          >
            A new star was born in the celestial sphere of education in 1994 at
            Christurajapuram
          </Typography>
          <FormatQuoteOutlined color="info" />
        </Stack>
       

       

        <Typography
          component={"p"}
          p={3}
          align="justify"
          fontFamily={"sans-serif"}
          sx={{ fontSize: { xs: 15, md: 18 } }}
        >
          Andhra bishop's conference decided to shift the Christ the king
          Seminary to Nuzvid from the academic year 1994-1995. So most Rev.
          Joseph Thumma the late Bishop of Vijayawada diocese, wanted to convert
          the seminary building into English medium school for the poor children
          of Christurajapuram, Vijayawada. To give excellent education to the
          children of Christurajapuram, the Sisters of St. Joseph of Cluny asked
          to take up the administration of the school under the leadership of
          Rev. Fr. Joseph Vempeny as its correspondent.
        </Typography>
        <Typography
          component={"p"}
          p={3}
          align="justify"
          sx={{ fontSize: { xs: 15, md: 18 } }}
        >
          Sr. Suzanne Elangimattam the then provincial superior (the sisters of
          St. Joseph of Cluny, south east province, Pondicherry) sent two
          sisters to start the school. Sr. Rita Ninappil Puthenpura was
          appointed as the principal and Sr. Agnes Rego was a vice principal
          with one teacher, the school started on 20th of June with the strength
          of 95 students on its roll from L.K.G to std. 1, as a co-education.
          The school emblem was designed by the first principal Sr. Rita as well
          as the motto "reach out in love". The school was recognized by Govt of
          Andhra Pradesh on 1.1.1995.
        </Typography>
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography
          variant="h4"
          textTransform={"uppercase"}
          color="#2196f3"
          align="center"
          sx={{ display: { xs: "none", md: "flex", marginLeft: "25%" } }}
        >
          Aims & Objectives of christ the king
        </Typography>
        <Typography
          variant="h6"
          textTransform={"uppercase"}
          color="#2196f3"
          align="center"
          sx={{ display: { xs: "flex", md: "none" }, fontSize: 20 }}
        >
          Aims & Objectives of christ the king
        </Typography>
        <List component={Paper} variant="outlined" sx={{ placeItems: "center", p: 4,my:4 }}>
          <ListItem>
            <ListItemIcon>
              <Forward color="info" />
            </ListItemIcon>
            <ListItemText
              primary=" To bring about an integrated development of the student, i.e. to develop student physically, intellectually, morally, spiritually, envotionally and aesthetically.
"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Forward color="info" />
            </ListItemIcon>
            <ListItemText
              primary="  To enable students to discover in their lives a deeper awareness of God, to be open to all religions, promoting inter-relatedness leading to integration.

"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Forward color="info" />
            </ListItemIcon>
            <ListItemText
              primary="  To mould free and responsible citizens who uphold the democratic values of justice, liberty, equality and brotherhood emphasized in the Indian constitution.

"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Forward color="info" />
            </ListItemIcon>
            <ListItemText
              primary=" To form men and women who are capable of rendering committed and compassionate service to the society especially to the poor.

"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Forward color="info" />
            </ListItemIcon>
            <ListItemText
              primary=" To sensitize students towards ecological preservation and restoration.

"
            />
          </ListItem>
        </List>

        <Typography
          variant="h4"
          textTransform={"uppercase"}
          color="#2196f3"
          align="center"
          sx={{ display: { xs: "none", md: "flex", marginLeft: "25%" } }}
        >
          THE SCHOOL EMBLEM AND MOTO
        </Typography>
        <Typography
          variant="h6"
          textTransform={"uppercase"}
          color="#2196f3"
          align="center"
          sx={{ display: { xs: "flex", md: "none" }, fontSize: 20 }}
        >
          THE SCHOOL EMBLEM AND MOTO
        </Typography>
        <Stack spacing={1} p={4} component={Paper} variant="outlined" my={4}>
          <Typography align="justify">
            The School emblem consists of Sacred Heart and the crown with the
            cross is designed with the School motto "Reach out in Love"
            inscribed beneath.
          </Typography>
          <Typography textAlign={"end"}>The Sacred Heart</Typography>
          <Typography textAlign={"end"}>The Crown</Typography>
          <Typography textAlign={"end"}>The Cross</Typography>
          <Typography align="justify">
            The emblem and motto graphically portray the thrust of the School to
            mould young minds and hearts and help them blossom into
            knowledgeable and virtuous young men and women.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default About;

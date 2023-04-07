import { FormatQuoteOutlined, Forward } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";
const About = () => {
  return (
    <Container>
      <Box component="div" role="presentation" sx={{ my: 2 }}>
        <Typography variant="h6">About Us</Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/">
            Home
          </Link>

          <Typography sx={{ color: "#757ce8" }}>About Us</Typography>
        </Breadcrumbs>
      </Box>

      <Container sx={{ px: 3, mb: 3 }}>
        <Container sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            textTransform={"uppercase"}
            color="Highlight"
            align="center"
          >
            History of the school
          </Typography>
          <Box
            component="img"
            src={logo}
            href="/"
            sx={{
              m: 2,
              display: { xs: "none", md: "flex" },
              width: "10%",
              margin: "auto",
              my: 2,
            }}
          />

          <Stack direction={"row"} justifyContent="center" spacing={2} p={2}>
            <FormatQuoteOutlined color="info" />
            <Typography variant="h6">
              A new star was born in the celestial sphere of education in 1994
              at Christurajapuram
            </Typography>
            <FormatQuoteOutlined color="info" />
          </Stack>

          <Typography component={"p"} p={3} align="justify">
            Andhra bishop's conference decided to shift the Christ the king
            Seminary to Nuzvid from the academic year 1994-1995. So most Rev.
            Joseph Thumma the late Bishop of Vijayawada diocese, wanted to
            convert the seminary building into English medium school for the
            poor children of Christurajapuram, Vijayawada. To give excellent
            education to the children of Christurajapuram, the Sisters of St.
            Joseph of Cluny asked to take up the administration of the school
            under the leadership of Rev. Fr. Joseph Vempeny as its
            correspondent.
          </Typography>
          <Typography component={"p"} p={3} align="justify">
            Sr. Suzanne Elangimattam the then provincial superior (the sisters
            of St. Joseph of Cluny, south east province, Pondicherry) sent two
            sisters to start the school. Sr. Rita Ninappil Puthenpura was
            appointed as the principal and Sr. Agnes Rego was a vice principal
            with one teacher, the school started on 20th of June with the
            strength of 95 students on its roll from L.K.G to std. 1, as a
            co-education. The school emblem was designed by the first principal
            Sr. Rita as well as the motto "reach out in love". The school was
            recognized by Govt of Andhra Pradesh on 1.1.1995.
          </Typography>
        </Container>

        <Container sx={{ my: 3 }}>
          <Typography
            variant="h4"
            textTransform={"uppercase"}
            color="Highlight"
            align="center"
          >
            Aims & Objectives of christ the king
          </Typography>
          <List sx={{ placeItems: "center", p: 4 }}>
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
            color="Highlight"
            align="center"
          >
            The school emblem and the motto
          </Typography>
          <Stack spacing={1} p={4}>
            <Typography align="justify">
              The School emblem consists of Sacred Heart and the crown with the
              cross is designed with the School motto "Reach out in Love"
              inscribed beneath.
            </Typography>
            <Typography textAlign={"end"}>The Sacred Heart</Typography>
            <Typography textAlign={"end"}>The Crown</Typography>
            <Typography textAlign={"end"}>The Cross</Typography>
            <Typography align="justify">
              The emblem and motto graphically portray the thrust of the School
              to mould young minds and hearts and help them blossom into
              knowledgeable and virtuous young men and women.
            </Typography>
          </Stack>
        </Container>
      </Container>
    </Container>
  );
};

export default About;

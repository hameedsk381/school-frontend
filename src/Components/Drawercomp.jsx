import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { AdminPanelSettings,  ContactEmergencyOutlined, HomeOutlined, MenuOutlined, Person2Outlined, Person3Outlined, School, ShieldMoonOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png'
import { useSelector } from 'react-redux';
const drawerlist1 = [{name:"Home",route:"/",icon:<HomeOutlined/>},{name:"Academics",route:"/academics",icon:<School/>},{name:"Admissions",route:"/admissions",icon:<AdminPanelSettings/>},{name:"Clubs",route:"/clubs",icon:<ShieldMoonOutlined/>},{name:"Faculty",route:"faculty",icon:<Person3Outlined/>},{name:"Contact",route:"contact",icon:<ContactEmergencyOutlined/>}]
const drawerlist = [{name:"Home",route:"/",icon:<HomeOutlined/>},{name:"My profile",route:"/profile",icon:<Person2Outlined/>},{name:"Academics",route:"/academics",icon:<School/>},{name:"Admissions",route:"/admissions",icon:<AdminPanelSettings/>},{name:"Clubs",route:"/clubs",icon:<ShieldMoonOutlined/>},{name:"Faculty",route:"faculty",icon:<Person3Outlined/>},{name:"Contact",route:"contact",icon:<ContactEmergencyOutlined/>}]
export default function Drawercomp() {
  const [state, setState] = React.useState({
    
    left: false,
   
  });
  const userstate = useSelector(state => state.loginUserReducer)
  const { currentUser } = userstate
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 350 ,bgcolor:"Highlight",height:"100%",color:"Highlighttext",p:2}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <Box
         
    noWrap
    component="img"
    src={logo}
    href="/"
    sx={{
      mr: 2,
      display: { xs: 'none', md: 'flex' },
     width:"80%",m:1
    }}
  />
      <List>
        { currentUser !== null ? (drawerlist.map((text, index) => (
          <ListItem key={text} disablePadding sx={{ '&& .Mui-selected, && .Mui-selected:hover': {
            bgcolor: 'red',
            '&, & .MuiListItemIcon-root': {
              color: 'pink',
            },
          },
          // hover states
          '& .MuiListItemButton-root:hover': {
            bgcolor: 'white',
            '&, & .MuiListItemIcon-root': {
              color: 'Highlight',
            },
          },}}>
            <ListItemButton >
              <ListItemIcon sx={{color:"white"}}>
               {text.icon}
              </ListItemIcon>
              <ListItemText   > <Link to={`${text.route}`}>{text.name}</Link></ListItemText>
            </ListItemButton>
          </ListItem>
        ))): (drawerlist1.map((text, index) => (
          <ListItem key={text} disablePadding sx={{ '&& .Mui-selected, && .Mui-selected:hover': {
            bgcolor: 'red',
            '&, & .MuiListItemIcon-root': {
              color: 'pink',
            },
          },
          // hover states
          '& .MuiListItemButton-root:hover': {
            bgcolor: 'white',
            '&, & .MuiListItemIcon-root': {
              color: 'Highlight',
            },
          },}}>
            <ListItemButton >
              <ListItemIcon sx={{color:"white"}}>
               {text.icon}
              </ListItemIcon>
              <ListItemText   > <Link to={`${text.route}`}>{text.name}</Link></ListItemText>
            </ListItemButton>
          </ListItem>
        )))}
      </List>
      
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} sx={{display:{xs:"none",md:"flex"}}}><MenuOutlined sx={{color:"white"}}/></Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
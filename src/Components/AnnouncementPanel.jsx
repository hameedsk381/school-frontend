import React, { useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemIcon,
  CircularProgress,
  Box,
} from '@mui/material';
import { CampaignOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getAnnouncements } from '../actions/announcementActions';
import { Link } from 'react-router-dom';

const AnnouncementPanel = () => {
    const {announcements,loading} = useSelector((state) => state.getAllAnnouncements);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAnnouncements());
       }, [dispatch])
       
  return (
    <Card elevation={0} sx={{height:300}}>
      <CardHeader  sx={{backgroundColor:'#2196f3'}}
      title="Announcements" titleTypographyProps={{
        variant: "h5",
        align: "center",
        color:'white'

      }}
       />
      <CardContent sx={{ height: 280, overflow: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {loading ? <CircularProgress sx={{mt:"30%"}}/> : <List disablePadding component={'ul'}>
    
          {announcements && announcements.map((announcement, index) => (
           
               
                  <ListItem key={index} disablePadding>
                  <ListItemIcon><CampaignOutlined/></ListItemIcon>
                    <ListItemText sx={{textTransform:"capitalize"}}
                      primary={
                        <Typography variant="body1" sx={{color:'#2196f3'}} component={Link} to={`/announcement/${announcement._id}`}>
                          {announcement.title}
                        </Typography>
                      }
                      secondary={`${announcement.description.substring(0, 101)}...`}
                    />
                  </ListItem>
              
            
          ))}
          </List>}
          </Box>
      </CardContent>
      

    </Card>
  );
};

export default AnnouncementPanel;

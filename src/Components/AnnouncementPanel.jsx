import React, { useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  ListItemIcon,
} from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { CampaignOutlined, More, Visibility } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getAnnouncements } from '../actions/announcementActions';
import { Link } from 'react-router-dom';

const AnnouncementPanel = () => {
    const {announcements} = useSelector((state) => state.getAllAnnouncements);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAnnouncements())
       }, [])
       
  return (
    <Card elevation={0} sx={{height:"80%"}}>
      <CardHeader   
      action={
        <IconButton aria-label="settings">
          <More/>
        </IconButton>
      }
      title="Announcements"
       />
      <CardContent sx={{height:280}}>
        
          {announcements && announcements.map((announcement, index) => (
           
                <List disablePadding component={'ul'}>
                  <ListItem disablePadding>
                  <ListItemIcon><CampaignOutlined/></ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1" component="div">
                          {announcement.title}
                        </Typography>
                      }
                      secondary={announcement.description.substring(20)}
                    />
                  </ListItem>
                </List>
            
          ))}
        
      </CardContent>
      

    </Card>
  );
};

export default AnnouncementPanel;

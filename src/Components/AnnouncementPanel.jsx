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
    <Card elevation={0} sx={{height:300}}>
      <CardHeader  sx={{backgroundColor:'#2196f3'}}
      title="Announcements" titleTypographyProps={{
        variant: "h5",
        align: "center",
        color:'white'

      }}
       />
      <CardContent sx={{ height: 280, overflow: 'auto' }}>
      <List disablePadding component={'ul'}>
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
          </List>
      </CardContent>
      

    </Card>
  );
};

export default AnnouncementPanel;

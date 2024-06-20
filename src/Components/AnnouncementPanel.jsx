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
  Skeleton,
  Container,
  CardActions,
  Button
} from '@mui/material';
import { ArrowForward, CampaignOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getAnnouncements } from '../actions/announcementActions';
import { Link } from 'react-router-dom';

const AnnouncementPanel = ({ card = true }) => {
  const { announcements, loading } = useSelector((state) => state.getAllAnnouncements);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnnouncements());
  }, [dispatch]);

  return (
    <Card elevation={0} >
      <CardHeader
        sx={{ backgroundColor: '#2196f3' }}
        title="Announcements"
        titleTypographyProps={{
          variant: "h5",
          align: "center",
          color: 'white'
        }}
      />
      <CardContent >
        <Container>
          {loading ? (
            <Container maxWidth='md'>
              {[1, 2, 3, 4, 5].map((item) => (
                <Box key={item} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Box sx={{ ml: 2, width: '100%' }}>
                    <Skeleton width="60%" />
                    <Skeleton width="80%" />
                  </Box>
                </Box>
              ))}
            </Container>
          ) : card ? (
            <List disablePadding component={'ul'}>
              {announcements && announcements.map((announcement, index) => (
                <ListItem key={index} disablePadding>
                  <Card sx={{ width: '100%', m: 2 ,p:2 }} elevation={4}>
                    <CardContent>
                      <Typography variant="h6" sx={{ color: '#2196f3' }}>
                        {announcement.title}
                      </Typography>
                      <Typography variant="body2">
                        {announcement.description.substring(0, 101)}...
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button variant='contained' size="small" component={Link} to={`/announcement/${announcement._id}`} endIcon={<ArrowForward/>}>
                        View Announcement
                      </Button>
                    </CardActions>
                  </Card>
                </ListItem>
              ))}
            </List>
          ) : (
            <List disablePadding component={'ul'}>
              {announcements && announcements.map((announcement, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemIcon><CampaignOutlined /></ListItemIcon>
                  <ListItemText sx={{ textTransform: "capitalize" }}
                    primary={
                      <Typography variant="body1" sx={{ color: '#2196f3' }} component={Link} to={`/announcement/${announcement._id}`}>
                        {announcement.title}
                      </Typography>
                    }
                    secondary={`${announcement.description.substring(0, 101)}...`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Container>
      </CardContent>
    </Card>
  );
};
// Set default props for the component
AnnouncementPanel.defaultProps = {
  card: true,
};
export default AnnouncementPanel;

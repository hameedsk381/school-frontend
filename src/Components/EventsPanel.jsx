import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
} from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../actions/eventActions';
import { Link } from 'react-router-dom';

const EventsPanel = () => {
  const {events} = useSelector((state) => state.getAllEvents);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEvents())
   }, [])
   

  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Events
        </Typography>
        <Timeline position='alternate'>
          {events.map((event) => (
            <TimelineItem key={event._id}>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" component={Link} sx={{color:"#2196f3",textTransform:"capitalize"}}>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
};

export default EventsPanel;

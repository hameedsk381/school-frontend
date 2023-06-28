import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Announcements = ({ announcements }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Announcements
      </Typography>
      <Timeline align="alternate">
        {announcements && announcements.map((announcement) => (
          <TimelineItem key={announcement._id}>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    {announcement.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {announcement.description}
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    component={Link}
                    to={`/announcement/${announcement._id}`}
                    size="small"
                    color="primary"
                    endIcon={<Visibility />}
                  >
                    View Full Announcement
                  </Button>
                </CardActions>
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default Announcements;

import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  ListItem,
  Box,
} from '@mui/material';
import { GetApp as DownloadIcon } from '@mui/icons-material';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const MaterialCard = ({ material, handleDownload }) => {
  const handleDownloadAll = () => {
    material.fileLocations.forEach(file => {
      window.open(file, '_blank');
    });
  };

  return (
    <ListItem>
      <Card variant="outlined" sx={{ width: '100%', marginBottom: 2 }}>
        <CardContent>
          <Typography my={1} variant="h6">{capitalizeFirstLetter(material.title)}</Typography>
          <Typography my={1} variant="body2" color="textSecondary">
            Subject: {capitalizeFirstLetter(material.subject)}
          </Typography>
          <Typography my={1} variant="body2" color="textSecondary">
            Class: {material.selectedClass}
          </Typography>
          <Typography my={1} variant="body2" color="textSecondary">
            Uploaded At: {new Date(material.createdAt).toLocaleString()}
          </Typography>
        </CardContent>
        <CardActions sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 1 ,mb:2}}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleDownloadAll}
              startIcon={<DownloadIcon />}
            >
              Download 
            </Button>
          </Box>
        </CardActions>
      </Card>
    </ListItem>
  );
};

export default MaterialCard;

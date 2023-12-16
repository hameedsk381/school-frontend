

import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { Avatar, Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import REACT_API_URL from '../config';
import axios from 'axios';

export default function Alumni() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${REACT_API_URL}/alumni`);
        setFeedbackData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <Box sx={{ display: 'flex', overflowX: 'hidden', py: 2 }}>
    {loading ? (
      <CircularProgress />
    ) : error ? (
      <Typography>{error}</Typography>
    ) : ( feedbackData.map((feedback,i) => (
    <Card
key={i}
      variant="outlined" 
      row
      sx={{
        display: {xs:"block",md:"flex"},
        width:{xs:"100%",md:"100%"},my:3,
      p:3,color:"#2196f3",backgroundColor:"ivory",
        gap: 2,justifyContent:"space-around",textAlign:"center",alignItems:"center",mx:3,
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
      }}
    >
     
        <Avatar
          src={`data:image/png;base64,${feedback.image}`}
        
          loading="lazy"
          alt={feedback.name}
          sx={{
            width:150,height:150,display:{xs:"none",md:"flex"}}}
            title={feedback.name}
        />
     
      <div className='d-block'>
      <Avatar
      src={`data:image/png;base64,${feedback.image}`}
  
      loading="lazy"
      alt={feedback.name}
      title={feedback.name}
      sx={{
        margin:"auto",width:150,height:150,display:{xs:"block",md:"none"},my:2}}
    />
        <Typography level="h2" fontSize="lg" id="card-description" mb={1} sx={{fontWeight:"bold"}}>
         {feedback.testimony}
        </Typography>
        <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: '#000000',fontSize:"20px" }}
          >
           {feedback.fullName}
          </Link>
        </Typography>
        <Chip
          variant="text"
          color="primary"
          size="lg"
          sx={{ pointerEvents: 'none',fontWeight:"bold" }}
        >
          Alumni <br/> {feedback.passedOutBatch}
        </Chip>
      </div>
    </Card>))
    )}
    </Box>
  );
}
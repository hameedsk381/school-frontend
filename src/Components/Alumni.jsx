import * as React from 'react';

import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { Avatar } from '@mui/material';

export default function Alumni() {
  return (
    <Card
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
          src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
          srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
          loading="lazy"
          alt="alumni"
          sx={{
            width:150,height:150,display:{xs:"none",md:"flex"}}}
        />
     
      <div className='d-block'>
      <Avatar
      src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
      srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
      loading="lazy"
      alt="alumni"
      sx={{
        margin:"auto",width:150,height:150,display:{xs:"block",md:"none"},my:2}}
    />
        <Typography level="h2" fontSize="lg" id="card-description" mb={1} sx={{fontWeight:"bold"}}>
         "Its been a great journey with Christ international school"
        </Typography>
        <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: '#000000',fontSize:"20px" }}
          >
           Pity Parker
          </Link>
        </Typography>
        <Chip
          variant="text"
          color="primary"
          size="lg"
          sx={{ pointerEvents: 'none',fontWeight:"bold" }}
        >
          Alumni  2015
        </Chip>
      </div>
    </Card>
  );
}
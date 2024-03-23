import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import { Button } from '@mui/joy';
import { Link } from 'react-router-dom';


export default function Menulist({menu,bg,route}) {
  return (
    <Card sx={{ minHeight: '280px' ,margin:"auto",mx:3,my:4,transition:"transform .2s",'&:hover': {transform: "scale(1.1)", boxShadow: 'lg', borderBlock:"3px solid white",mx:3 }}}>
      <CardCover>
        <img
          src={bg}
        
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',

           
        }}
      />
      <CardContent sx={{ justifyContent: 'center',textAlign:"center" }}>
        <Button  variant='text'  sx={{color:"white",mb:4,textAlign:"left",borderRadius:'0px',py:2,fontSize:"20px" ,'&:hover': { boxShadow: 'md', borderBlock:"1px solid white",mx:3,transition: "transform .2s", }}}>
         <Link to={`/${route}`}>{menu}</Link>
        </Button>
      
       
      </CardContent>
    </Card>
  );
}
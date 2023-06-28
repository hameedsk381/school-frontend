import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Typography } from '@mui/material'
import pic from '../assets/sp.jpg'
import pic2 from '../assets/schoolmain.JPG'
import Marquee from 'react-fast-marquee'

export default function Images(props)
{
    var items = [
        {
           pic:`${pic}`
        },
        {
          pic:`${pic2}`
        }
    ]

    return (
     
        
        <Carousel navButtonsAlwaysInvisible animation='slide' autoPlay indicators={false} sx={{width:"100%",height:"100%",}}>
        {
            items.map( (item, i) => <Item key={i} item={item} /> )
        }
    </Carousel>
    
  
        
    )
}

function Item(props)
{
    return (
        <Paper>
        <Marquee><Typography component='img' src={props.item.pic} alt="logo" sx={{ width:"100%",height:"100%",objectFit:"cover",maxHeight:"600px"}}/></Marquee>
           
        </Paper>
    )
}
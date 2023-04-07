import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../actions/userActions';


export default function Profilecard({data}) {
  
  const dispatch = useDispatch();
 
  return (
    <Card sx={{py:2,transition:"transform .2s" ,':hover':{transform:"scale(1.2)"}}} elevation={1}  >
      <CardMedia
        sx={{borderRadius:15, height:130,width:130,margin:'auto',my:2,transition:"transform .2s" ,':hover':{transform:"scale(1.2)"}}}
        image={data.profilepic}
        title={data.name}
      />
      
     
      <CardContent>
        <Typography color={'Highlight'} gutterBottom variant="h5" component="div" textAlign={'center'} sx={{textTransform:"capitalize"}}>
         {data.name}
        </Typography>
        <Typography variant="h6" textAlign={'center'} color="text.secondary">
        {data.department} Department
        </Typography>
      </CardContent>
      <CardActions sx={{justifyContent:"center"}}>
        <Button variant='contained' size='small'><Link size="small"  onClick={()=>{}} sx={{textTransform:"capitalize"}} to={`/user/${data._id}`} >View profile</Link></Button>
        
      </CardActions>
    </Card>
  );
}
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, Button, Container,  Modal, Typography } from '@mui/material';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import axios from 'axios';



  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:{xs:"100%",lg:"50%"},
    bgcolor: 'background.paper',
   
    boxShadow: 20,
    p: 2,
  };
  
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Imagelist() {
    const [img,setImg] = React.useState(null)
    const [open, setOpen] = React.useState(false);
    const [pics, setpics] = React.useState([])
    const handleClose = () => setOpen(false);
    React.useEffect(() => {
      axios.get(`/api/`).then(res=>{
       
        setpics(res.data)})
    }, [])
  return (
   <Container>
   <Typography  color={'Highlight'} textAlign="center" mt={2} p={2}  sx={{fontFamily:"-moz-initial",fontSize:{xs:20,md:30,lg:40}}}>Gallery</Typography>
  
   <Modal
   open={open}
   onClose={handleClose}
   aria-labelledby="modal-modal-title"
   aria-describedby="modal-modal-description"
 >
   <Box sx={style}>
   <TransformWrapper>
   <TransformComponent>
   <img src={img} alt="img" />
   <Button variant='contained' size='small' sx={{m:"auto",my:1}} href={img} download> Download image</Button>
   </TransformComponent>
 </TransformWrapper>
   
     
   </Box>
 </Modal>
 
 <ImageList
 sx={{ width: 500, height: 450 }}
 variant="quilted"
 cols={4}
 rowHeight={121}
>
 {pics.map((item) => (
   <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
   <img
   {...srcset(item, 121, item.rows, item.cols)}
    alt={item.title}
    loading="lazy"
    onClick={()=>{setOpen(true);setImg(item)}}
    style={{filter:"drop-shadow(8px 8px 10px gray)"}}
  />
   </ImageListItem>
 ))}
</ImageList>
   </Container>
  );
}


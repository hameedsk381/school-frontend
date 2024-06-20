import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Stack,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { addAnnouncement, deleteAnnouncement, getAnnouncements, updateAnnouncement } from '../actions/announcementActions';
import Swal from 'sweetalert2';


const Announcementpage = () => {
  const {announcements} = useSelector((state) => state.getAllAnnouncements);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleAdd = () => {
    const newAnnouncement = { title, description };
    dispatch(addAnnouncement(newAnnouncement));
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `announcement  has been added`,
        showConfirmButton: false,
        timer: 1500
      })
    setTitle('');
    setDescription('');
    setInterval(()=>{
        window.location.reload()
    },2000)
  };
useEffect(() => {
 dispatch(getAnnouncements())
}, [])

  const handleUpdate = () => {
    const updatedAnnouncement = { title, description };
    dispatch(updateAnnouncement(selectedId, updatedAnnouncement));
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `announcement  has been updated`,
        showConfirmButton: false,
        timer: 1500
      })
    setEditing(false);
    setSelectedId(null);
    setTitle('');
    setDescription('');
setInterval(()=>{
    window.location.reload()
},2000)
   
  };

  const handleDelete = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            dispatch(deleteAnnouncement(id));
    if (selectedId === id) {
        setSelectedId(null);
        setEditing(false);
        setTitle('');
        setDescription('');
      }
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
      setInterval(()=>{
        window.location.reload()
      },2000)
        }
      })
    
  };

  const handleEdit = (id) => {
    const announcement = announcements.find((a) => a._id === id);
    setSelectedId(id);
    setTitle(announcement.title);
    setDescription(announcement.description);
    setEditing(true);
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" textAlign={'center'} gutterBottom>
          Announcements
        </Typography>
        <Stack component={Paper} p={3} justifyContent={'center'} spacing={3} sx={{width:{xs:"100%",md:'50%',lg:"30%"}}} margin={'auto'} my={3} >
          <Typography variant="h6">Add Announcement</Typography>
          <TextField size='small' type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField size='small' multiline type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          {editing ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button sx={{mx:2}} variant='outlined' startIcon={<EditIcon/>} onClick={handleUpdate}>Update</Button>
              <Button sx={{mx:2}} variant='outlined'  startIcon={<DeleteIcon/>}  onClick={() => {
                setEditing(false);
                setSelectedId(null);
                setTitle('');
                setDescription('');
              }}>Delete</Button>
            </Box>
          ) : (
            <Button variant='outlined' onClick={handleAdd}>Add </Button>
          )}
        </Stack>
      </Box>
      {announcements.map(({ _id, title, description },i) => (
        <List component={Paper} variant='outlined' sx={{my:2}} key={i}>
        <ListItem>
        <ListItemText primary={title}  sx={{textTransform:'capitalize'}} secondary={description}/>
       
          <Box sx={{ mt: 1 }}>
            <IconButton color='info'  onClick={() => handleEdit(_id)}>
              <EditIcon />
            </IconButton>
            <IconButton color='secondary' onClick={() => handleDelete(_id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </ListItem>
        </List>
      ))}
    </Box>
  );
};

export default Announcementpage;

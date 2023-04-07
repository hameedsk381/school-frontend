import { Box, Button, Container,  Input, Stack, Typography } from '@mui/material'
import axios from 'axios'


import React, { useEffect, useState } from 'react'

const Collegepics = () => {
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [pics, setpics] = useState([])
   

    const handleUploadFiles = files => { 
        const uploaded = [...uploadedFiles];
        let limitexceeded = false;
        // eslint-disable-next-line array-callback-return
        files.some((file) => {    

            if(uploaded.findIndex((f)=>f.name ===file.name)=== -1){
                uploaded.push(file);
               
                
            }
        })
        if (!limitexceeded) 
        setUploadedFiles(uploaded)

    }
    const handleFileEvent = (e)=>{
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        handleUploadFiles(chosenFiles);
    }
   

    
    const onSubmit =(e) =>{

        e.preventDefault()
        if (!uploadedFiles) {
            return;
          }
        const formData = new FormData();
        for (const key of Object.keys(uploadedFiles)) {
            formData.append('imgCollection', uploadedFiles[key])
        }
        axios.post(`/api/upload-images`, formData, {
        })
    }
    useEffect(() => {
     axios.get("/api").then(res=>{
       
        setpics(res.data.users[0].imgCollection)
     })
    
     
    }, [])
    
  return (
    <div className="container">
                <Container >
                <Typography textAlign={'center'} variant='h4'>React Multiple File Upload</Typography>
                  <Stack component={'form'} onSubmit={onSubmit} direction='row' p={4}>
                 
                 
              
                      <Input type="file" multiple onChange={handleFileEvent}  name='imgCollection' accept='image/png,image/jpg,image/jpeg'/>
                  
                  
                    <Button variant='contained' type="submit">Upload</Button>
                 
            
                  </Stack>

                  {uploadedFiles.map((file,i)=>(
                    <Stack key={i}>{file.name}</Stack>
                  ))}

                  <Stack direction={'row'}>
                  
                  {pics.map((item,i)=>(
                    <Stack key={i} direction='row' spacing={14} justifyContent='space-around'>
                    
                    <Box component='img' src={item} sx={{width:100,height:100}} alt={item._id}/>
                    </Stack>
 
                   ))}
                  </Stack>
                </Container>
            </div>
  )
}

export default Collegepics
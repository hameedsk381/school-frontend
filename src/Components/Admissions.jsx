import { Forward } from '@mui/icons-material'
import { Box, Breadcrumbs, Container, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Admissions = () => {
  return (
    <Container >
    <Box component="div" role="presentation" sx={{ my: 2 }}>
    <Typography variant="h6">Admissions</Typography>
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" to="/">
        Home
      </Link>

      <Typography sx={{ color: "#757ce8" }}>Admissions</Typography>
    </Breadcrumbs>
  </Box>
    <div className="bg-white max-h-screen font-sans" >
    <div className="container mx-auto py-12" >
      <h1 className="text-3xl font-bold text-center mb-8 text-[#2563eb] " >
        Admissions Open
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-[#2563eb]" >Admission Process</h2>
          <ol className="list-decimal list-inside">
            <li>Fill out the application form online.</li>
            <li>Pay the application fee.</li>
            <li>Appear for the entrance exam on the given date.</li>
            <li>Attend the interview with the school authorities.</li>
            <li>Receive admission confirmation.</li>
          </ol>
        </div>
        <div className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-[#2563eb]" >Important Dates</h2>
          <ul className="list-disc list-inside">
            <li>Application Deadline: 30th April, 2023</li>
            <li>Entrance Exam Date: 15th May, 2023</li>
            <li>Interview Dates: 20th May - 30th May, 2023</li>
            <li>Admission Confirmation: 5th June, 2023</li>
          </ul>
          
        </div>
      </div>
      
    </div>
   
  

  </div>
  <div className="bg-gray-100 p-8 rounded-lg mb-6">
  <List dense sx={{ placeItems: "center", p: 4 }}>
  <ListItem>
    <ListItemIcon>
      <Forward color='info' />
    </ListItemIcon>
    <ListItemText sx={{justifyContent:"space-around" ,textAlign:"left"}} 
      primary="Admission into the school is open to all. Admissions are made on the strength of 'n oral Interview for L.K.G and Written Test for U.K.G to VIII Classes.
      
  "
    />
  </ListItem>
  
  <ListItem>
    <ListItemIcon>
      <Forward color='info' />
    </ListItemIcon>
    <ListItemText sx={{justifyContent:"space-around" ,textAlign:"left"}}
      primary="  Children below 4 years and above 5 years are not admitted to the nursery.
  
  "
    />
  </ListItem>
  <ListItem>
    <ListItemIcon>
      <Forward color='info' />
    </ListItemIcon>
    <ListItemText sx={{justifyContent:"space-around" ,textAlign:"left"}}
      primary="  The minimum age for admission into L.K.G is 4, years and
  
      into U.K.G is 5 and......so on. 
      
  
  "
    />
  </ListItem>
  <ListItem>
    <ListItemIcon>
      <Forward color='info' />
    </ListItemIcon>
    <ListItemText sx={{justifyContent:"space-around" ,textAlign:"left"}}
      primary=" Admissions for L.K.G., U.K.G. and I std are made on the production of Original Birth Certificate & Adhar Card.
  
  "
    />
  </ListItem>
  <ListItem>
    <ListItemIcon>
      <Forward color='info' />
    </ListItemIcon>
    <ListItemText sx={{justifyContent:"space-around" ,textAlign:"left"}}
      primary=" Admissions for classes II to VI are made on the production of Record Sheet of a recognised school or Original Date of Birth Certificate.
  
  
  "
    />
  </ListItem>
  <ListItem>
  <ListItemIcon>
    <Forward color='info' />
  </ListItemIcon>
  <ListItemText sx={{justifyContent:"space-around" ,textAlign:"left"}}
    primary=" Admissions for classes VII to VIII are made on the basis or Transfer Certificates Issued by any recognized school.
  
  
  
  
  "
  />
  </ListItem>
  <ListItem>
  <ListItemIcon>
  <Forward color='info' />
  </ListItemIcon>
  <ListItemText sx={{justifyContent:"space-around" ,textAlign:"left"}}
  primary=" Pupil having attended other recognised school will not be admitted without a Transfer Certificate. It should be duly countersigned by the proper Educations Authorities in case of pupil coming from outside Andhra Pradesh.
  
  
  
  "
  />
  </ListItem>
  <ListItem>
  <ListItemIcon>
  <Forward color='info' />
  </ListItemIcon>
  <ListItemText sx={{justifyContent:"space-around" ,textAlign:"left"}}
  primary=" Once a student is admitted in the School his/her date of birth will not be changed.
  
  
  
  "
  />
  </ListItem>
  <ListItem>
  <ListItemIcon>
  <Forward color='info' />
  </ListItemIcon>
  <ListItemText sx={{justifyContent:"space-around" ,textAlign:"left"}}
  primary=" Admissions start in November/Derember for every Aca- demic year. The cost of application form is Rs. 200/- Duly Filled in form should be returned within 3 days with 2 recent photographs of a child and above asked certificates.
  
  
  
  "
  />
  </ListItem>
  <ListItem>
  <ListItemIcon>
  <Forward color='info' />
  </ListItemIcon>
  <ListItemText sx={{justifyContent:"space-around" ,textAlign:"left"}}
  primary=" The students who seek admission must be accompanied by the parents on the interview day.
  
  
  
  
  "
  />
  </ListItem>
  <ListItem>
  <ListItemIcon>
  <Forward color='info' />
  </ListItemIcon>
  <ListItemText sx={{justifyContent:"space-around" ,textAlign:"left"}}
  primary="Admission into any class is subject to the seat availability and is done solely on the basis of merit.
  
  
  
  "
  />
  </ListItem>
  
  
  </List>
</div>
 
    </Container>
  )
}

export default Admissions
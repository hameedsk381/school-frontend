import { ArrowForward, Forward } from '@mui/icons-material'
import { Box, Breadcrumbs, Button, Container, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'







const AdmissionListItem = ({ primary }) => (
  <ListItem>
    <ListItemIcon>
      <Forward color='info' />
    </ListItemIcon>
    <ListItemText primary={primary} sx={{ justifyContent: "space-around", textAlign: "left" }} />
  </ListItem>
);

const Admissions = () => {
  return (
    <Container>
      <div role="presentation">
        <Typography variant="h6" mt={3}>Admissions</Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/">
            Home
          </Link>
          <Typography sx={{ color: "#757ce8" }}>Admissions</Typography>
        </Breadcrumbs>
      </div>

      <div className="bg-white max-h-screen font-sans">
        <div className="container mx-auto pb-12">
         <Stack justifyContent={'space-between'} direction={'row'} my={3}>
         <Typography  variant="h4" className="text-center mb-8 text-[#2563eb]">
            Admissions Open 
          </Typography>
         <Button variant='contained' endIcon={<ArrowForward/>}>  <Link to='/admissionform'>Register here</Link></Button>
         </Stack>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-8 rounded-lg">
              <Typography variant="h5" className="mb-4 text-[#2563eb]">
                Admission Process
              </Typography>
              <ol className="list-decimal list-inside">
                <li>Fill out the application form online.</li>
                <li>Pay the application fee.</li>
                <li>Appear for the entrance exam on the given date.</li>
                <li>Attend the interview with the school authorities.</li>
                <li>Receive admission confirmation.</li>
              </ol>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <Typography variant="h5" className="mb-4 text-[#2563eb]">
                Important Dates
              </Typography>
              <ul className="list-disc list-inside">
                <li>Application Deadline: 30th April, 2023</li>
                <li>Entrance Exam Date: 15th May, 2023</li>
                <li>Interview Dates: 20th May - 30th May, 2023</li>
                <li>Admission Confirmation: 5th June, 2023</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-8 rounded-lg mb-6">
          <List dense sx={{ placeItems: "center", p: 4 }}>
            <AdmissionListItem primary="Admission into the school is open to all. Admissions are made on the strength of an oral Interview for L.K.G and Written Test for U.K.G to VIII Classes." />
            <AdmissionListItem primary="Children below 4 years and above 5 years are not admitted to the nursery." />
            <AdmissionListItem primary="The minimum age for admission into L.K.G is 4 years and into U.K.G is 5 and...so on." />
            <AdmissionListItem primary="Admissions for L.K.G., U.K.G. and I std are made on the production of Original Birth Certificate & Adhar Card." />
            <AdmissionListItem primary="Admissions for classes II to VI are made on the production of Record Sheet of a recognized school or Original Date of Birth Certificate." />
            <AdmissionListItem primary="Admissions for classes VII to VIII are made on the basis of Transfer Certificates Issued by any recognized school." />
            <AdmissionListItem primary="Pupil having attended other recognized schools will not be admitted without a Transfer Certificate. It should be duly countersigned by the proper Education Authorities in case of pupils coming from outside Andhra Pradesh." />
            <AdmissionListItem primary="Once a student is admitted to the School, his/her date of birth will not be changed." />
            <AdmissionListItem primary="Admissions start in November/December for every Academic year. The cost of the application form is Rs. 200/-. Duly Filled-in forms should be returned within 3 days with 2 recent photographs of a child and the above-mentioned certificates." />
            <AdmissionListItem primary="Students who seek admission must be accompanied by the parents on the interview day." />
            <AdmissionListItem primary="Admission into any class is subject to seat availability and is done solely on the basis of merit." />
          </List>
        </div>
      </div>
    </Container>
  );
}

export default Admissions;

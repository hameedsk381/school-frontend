import Marquee from "react-fast-marquee";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./Components/About";
import Academics from "./Components/Academics";
import Admin from "./Components/Admin";
import Admissions from "./Components/Admissions";
import Appbar from "./Components/Appbar";
import Clubs from "./Components/Clubs";

import Contact from "./Components/Contact";
import Department from "./Components/Department";
import Faculty from "./Components/Faculty";
import Facultycard from "./Components/Facultycard";
import RegistrationForm from "./Components/RegistrationForm";

import Home from "./Components/Home";
import Homework from "./Components/Homework";
import Imagelist from "./Components/Imagelist";
import Login from "./Components/Login";

import Messagecard from "./Components/Messagecard";
import Profilecard from "./Components/Profilecard";

import User from "./Components/User";

import ClubForm from "./Components/ClubForm";
import NotFoundPage from "./Components/NotFoundPage";
import AlumniFeedbackForm from "./Components/AlumniFeedbackForm";


import { Box, Typography } from "@mui/material";
import React from "react";
import Announcements from "./Components/Announcements";
import Announcementpage from "./Components/Announcementpage";
import Announcement from "./Components/Announcement";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import SingleEvent from "./Components/SingleEvent";
import HomeworkForm from "./Components/HomeworkForm";
import AnnouncementPanel from "./Components/AnnouncementPanel";




function App() {
  

  return (
    <React.Fragment>
    
    <Appbar/>

 


      <Box >
      
      <Routes>
        <Route path="*" element={<NotFoundPage />} exact />
        <Route path="/" element={<Home />} exact />

        <Route path="/homework" element={<Homework />} exact />
        <Route path="/clubform" element={<ClubForm />} exact />
        <Route path="/register" element={<RegistrationForm />} exact />
        <Route path="/contact" element={<Contact />} exact />
        <Route path="/faculty" element={<Faculty />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/profile" element={<User />} exact />
        <Route path="/academics" element={<Academics />} exact />
        <Route path="/gallery" element={<Imagelist />} exact />
        <Route path="/profilecard" element={<Profilecard />} exact />
        <Route path="/user/:id" element={<Facultycard />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/message/:id" element={<Messagecard />} exact />
        <Route path="/clubs" element={<Clubs />} exact />
        <Route path="/departments" element={<Department />} exact />
        <Route path="/admin" element={<Admin />} exact />
        <Route path="/admissions" element={<Admissions />} exact />
        <Route path="/alumni" element={<AlumniFeedbackForm />} exact />
        <Route path="/announcement/:id" element={<Announcement />} exact />
        <Route path="/event/:id" element={<SingleEvent />} exact />
        <Route path="/forgot-password" element={<ForgotPassword />} exact />
        <Route path="/reset-password" element={<ResetPassword />} exact />
        <Route path="/homeworkform" element={<HomeworkForm />} exact />
        <Route path="/announcements" element={<AnnouncementPanel />} exact />
      </Routes>
      </Box>
    </React.Fragment>
  );
}

export default App;

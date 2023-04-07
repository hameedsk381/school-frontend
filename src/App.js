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
import Footer from "./Components/Footer";
import RegistrationForm from "./Components/RegistrationForm";

import Home from "./Components/Home";
import Homework from "./Components/Homework";
import Imagelist from "./Components/Imagelist";
import Login from "./Components/Login";
import Message from "./Components/Message";
import Messagecard from "./Components/Messagecard";
import Profilecard from "./Components/Profilecard";

import SignUp from "./Components/SignUp";

import User from "./Components/User";
import SignIn from "./Components/SignIn";
import ClubForm from "./Components/ClubForm";

function App() {
  return (
    <>
      <Appbar />
      
      <Marquee
        style={{
          backgroundColor: "white",
          color: "#2196f3",
          height: "43px",
          borderTop: "1px solid #ffffff",
        }}
        speed={150}
        gradient={false}
      >
        <p>hello</p>
      </Marquee>
      <Routes>
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
      </Routes>

     
    </>
  );
}

export default App;

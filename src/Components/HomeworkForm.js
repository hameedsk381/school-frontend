import { useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Stack
} from "@mui/material";
import { Textarea } from "@mui/joy";
import axios from "axios";
import { useSelector } from "react-redux";
import REACT_API_URL from "../config";
import { useId } from "react";
import Login from "./Login";

const HomeworkForm = () => {
    const subjects = ["Telugu", "Hindi", "English", "Maths", "EVS", "Science", "Biology", "Physics", "Chemistry", "Social Studies", "Moral Science", "General Knowledge", "Computers", "Catechism"]

    const idd = useId();
  const [homework, setHomework] = useState({
    description: "",
    note: "",
    class: "",
    subject:""
  });
  const loginstate = useSelector((state) => state.loginUserReducer);
  const {currentUser } = loginstate;
  const handleChange = (e) => {
    setHomework((prevHomework) => ({
      ...prevHomework,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        description: homework.description,
        section:homework.class.split("-")[1],
        regId: currentUser.regId, // Replace with the actual teacher ID
        note: homework.note,
        classname: homework.class.split("-")[0],
        subject:homework.subject
      };
      

      // Send API request using Axios
      const response = await axios.post(`${REACT_API_URL}/homework`, formData);
      
      console.log(response.data);

      // Reset the form
      setHomework({
        description: "",
        note: "",
        class: ""
      });
    } catch (error) {
      console.log(error);
    }
  };
 if(currentUser==null){
    return <Login/>
 }
 const currentteachingclasses = currentUser.currentlyTeaching[0].split(",").concat(currentUser.additionalTeachingClasses[0].split(","))
 const currentteachingdepartments = [currentUser.department].concat(currentUser.additionalTeachingDepartments[0].split(","))
 return (
    <Card sx={{width:{xs:"80%",md:"50%",lg:"35%"},margin:"auto",marginBlock:6}}>
      <CardContent component={Stack} spacing={3}>
        <Typography variant="h5" component="h1" sx={{color:"Highlight"}} >
          Upload Homework
        </Typography>
        <form onSubmit={handleSubmit}>
          <Textarea minRows={7} placeholder="Enter the homework.."
            name="description"
            label="Homework Description"
            value={homework.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField size="small"
            name="note"
            label="Additional Note"
            value={homework.note}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl size="small" fullWidth margin="normal">
            <InputLabel>Choose subject</InputLabel>
            <Select
              name="subject"
              value={homework.subject}
              onChange={handleChange}
              label="subject"
            >
             {currentteachingdepartments.map((item)=>(
                <MenuItem key={idd} sx={{textTransform:"capitalize"}} value={item}>{item}</MenuItem>
             ))}
            </Select>
          </FormControl>
          <FormControl size="small" fullWidth margin="normal">
            <InputLabel>Choose class</InputLabel>
            <Select
              name="class"
              value={homework.class}
              onChange={handleChange}
              label="Classes Teaching"
            >
             {currentteachingclasses.map((item)=>(
                <MenuItem key={idd} value={item}>{item}</MenuItem>
             ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" sx={{marginTop:3}} >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HomeworkForm;

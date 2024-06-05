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
 const currentteachingclasses = currentUser.classesTeaching.concat(currentUser.additionalclassesTeaching)
 return (
    <Card sx={{width:{xs:"80%",md:"50%",lg:"35%"},margin:"auto",marginBlock:6}}>
      <CardContent component={Stack} spacing={3}>
        <Typography variant="h5" component="h1" sx={{color:"#2196f3"}} >
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
            <InputLabel>Choose class</InputLabel>
            <Select
              name="class"
              value={homework.class}
              onChange={handleChange}
              label="Classes Teaching"
            >
             {currentteachingclasses.map((item,i)=>(
                <MenuItem key={i} value={item._id}>{item.name}</MenuItem>
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

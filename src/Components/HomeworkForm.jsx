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
  Stack,
  CircularProgress,
  IconButton,
  Box
} from "@mui/material";
import { Textarea } from "@mui/joy";
import axios from "axios";
import { useSelector } from "react-redux";
import REACT_API_URL from "../config";
import { useId } from "react";
import Login from "./Login";
import { AttachFile, Cancel } from "@mui/icons-material";

const HomeworkForm = () => {
  const [homework, setHomework] = useState({
    description: "",
    note: "",
    class: "",
    subject: ""
  });
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
const [loading,setLoading] = useState(false);
  const loginstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = loginstate;

  const handleChange = (e) => {
    setHomework((prevHomework) => ({
      ...prevHomework,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFilePreview(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post('https://reanarration-fastify-api.vercel.app/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;  // Assuming API response contains the URL of the uploaded file
    } catch (error) {
        console.error('Failed to upload image', error);
        throw new Error('Failed to upload image');
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
setLoading(true);
    try {
      const formData = new FormData();
      formData.append("description", homework.description);
      formData.append("section", homework.class.split("-")[1]);
      formData.append("regId", currentUser.regId); // Replace with the actual teacher ID
      formData.append("note", homework.note);
      formData.append("classname", homework.class.split("-")[0]);
      formData.append("subject", homework.subject);
      if (file) {
        const imageUrl = await handleImageUpload(file);
        formData.append("file", imageUrl);
      }

      // Send API request using Axios
      const response = await axios.post(`${REACT_API_URL}/homework`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
setLoading(false)
      console.log(response.data);

      // Reset the form
      setHomework({
        description: "",
        note: "",
        class: "",
        subject: ""
      });
      setFile(null);
      setFilePreview(null);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  if (currentUser == null) {
    return <Login />
  }
  const currentteachingclasses = currentUser.classesTeaching.concat(currentUser.additionalclassesTeaching);
  
  return (
    <Card sx={{ width: { xs: "80%", md: "50%", lg: "35%" }, margin: "auto", marginBlock: 6 }}>
      <CardContent component={Stack} spacing={3}>
        <Typography variant="h5" component="h1" sx={{ color: "#2196f3" }}>
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
              {currentteachingclasses.map((item, i) => (
                <MenuItem key={i} value={item._id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="department-label">Subject</InputLabel>
            <Select
              labelId="department-label"
              value={currentUser.department}
              label="Subject"
              readOnly
            >
              <MenuItem value={currentUser.department}>{currentUser.department}</MenuItem>
            </Select>
          </FormControl>
          <Stack direction="row" alignItems="center" spacing={2} margin="normal">
            <Button
              variant="outlined"
              component="label"
              startIcon={<AttachFile />}
            >
              Upload File
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept="image/*,video/*,application/pdf"
              />
            </Button>
            {file && (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body2" color="textSecondary">
                  {file.name}
                </Typography>
                <IconButton size="small" onClick={handleRemoveFile}>
                  <Cancel />
                </IconButton>
              </Stack>
            )}
          </Stack>
          {filePreview && (
            <Box sx={{ margin: '10px 0', textAlign: 'center' }}>
              <img src={filePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            </Box>
          )}

          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 3 }} disabled={loading}>
            {loading ? <CircularProgress/> : 'Submit'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HomeworkForm;

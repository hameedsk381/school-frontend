import React, { useState } from "react";
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
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { Textarea } from "@mui/joy";
import axios from "axios";
import { useSelector } from "react-redux";
import { AttachFile, Cancel } from "@mui/icons-material";
import Login from "./Login";
import REACT_API_URL from "../config";

const HomeworkForm = () => {
  const [homework, setHomework] = useState({
    description: "",
    note: "",
    class: "",
  });
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const loginState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = loginState;

  const handleChange = (e) => {
    setHomework((prevHomework) => ({
      ...prevHomework,
      [e.target.name]: e.target.value,
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
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://reanarration-fastify-api.vercel.app/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.url; // Assuming API response contains the URL of the uploaded file
    } catch (error) {
      console.error("Failed to upload image", error);
      throw new Error("Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;
      if (file) {
        imageUrl = await handleImageUpload(file); // Function to upload the file and return the URL
      }

      const payload = {
        classname: currentUser.classname,
        subject: currentUser.subject,
        description: homework.description,
        note: homework.note,
        teacher: currentUser.teacher,
        attachment: imageUrl ? imageUrl : null,
      };

      // Send API request using Axios
      const response = await axios.post(`${REACT_API_URL}/homework`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      setFile(null);
      setFilePreview(null);
      setSnackbarOpen(true);
      setHomework({
        description: "",
        note: "",
        class: "",
      });
    } catch (error) {
      console.error("Failed to submit homework", error);
      setLoading(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  if (!currentUser) {
    return <Login />;
  }

  return (
    <Card variant="outlined">
      <CardContent component={Stack} spacing={3}>
        <Typography variant="h5" component="h1" sx={{ color: "#2196f3" }}>
          Upload Homework
        </Typography>
        <form onSubmit={handleSubmit}>
          <Textarea
            minRows={7}
            placeholder="Enter the homework.."
            name="description"
            label="Homework Description"
            value={homework.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            size="small"
            name="note"
            label="Additional Note"
            value={homework.note}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Choose class</InputLabel>
            <Select
              name="class"
              value={homework.class}
              onChange={handleChange}
              label="Classes Teaching"
            >
              {currentUser.classesTeaching.map((cls) => (
                <MenuItem key={cls._id} value={cls._id}>
                  {cls.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Subject</InputLabel>
            <Select
              value={currentUser.subject}
              label="Subject"
              readOnly
            >
              <MenuItem value={currentUser.subject}>
                {currentUser.subject}
              </MenuItem>
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
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </form>
      </CardContent>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Homework uploaded successfully!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default HomeworkForm;

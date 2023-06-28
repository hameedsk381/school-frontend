import React, { useState } from "react";
import logo from "../assets/logo2.png";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import { registerUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const departments = [
  { value: "english", label: "English" },
  { value: "play school", label: "Play School" },
  { value: "science", label: "Science" },
  { value: "telugu", label: "Telugu" },
  { value: "hindi", label: "Hindi" },
  { value: "physical education", label: "Physical education" },
  { value: "mathematics", label: "Mathematics" },
  { value: "office", label: "Office" },
  { value: "computer", label: "Computer" },
  { value: "non-teaching", label: "Non-teaching" },
];
const actingClassTeacherFor = [
  "Not a class teacher",
  "Play school",
  "Non-teaching",
  "LKG-A",
  "LKG-B",
  "LKG-C",
  "UKG-A",
  "UKG-B",
  "UKG-C",
  "I-A",
  "I-B",
  "I-C",
  "II-A",
  "II-B",
  "II-C",
  "III-A",
  "III-B",
  "III-C",
  "IV-A",
  "IV-B",
  "IV-C",
  "V-A",
  "V-B",
  "V-C",
  "VI-A",
  "VI-B",
  "VI-C",
  "VII-A",
  "VII-B",
  "VII-C",
  "VIII-A",
  "VIII-B",
  "VIII-C",
  "IX-A",
  "IX-B",
  "IX-C",
  "X-A",
  "X-B",
  "X-C",
];

const additionalTeachingclasses = [
  "All",
  "Office staff",
  "Play school",
  "Non-teaching",
  "LKG-A",
  "LKG-B",
  "LKG-C",
  "UKG-A",
  "UKG-B",
  "UKG-C",
  "I-A",
  "I-B",
  "I-C",
  "II-A",
  "II-B",
  "II-C",
  "III-A",
  "III-B",
  "III-C",
  "IV-A",
  "IV-B",
  "IV-C",
  "V-A",
  "V-B",
  "V-C",
  "VI-A",
  "VI-B",
  "VI-C",
  "VII-A",
  "VII-B",
  "VII-C",
  "VIII-A",
  "VIII-B",
  "VIII-C",
  "IX-A",
  "IX-B",
  "IX-C",
  "X-A",
  "X-B",
  "X-C",
];

const additionalteachingdepts = [
  "Not teaching",
  "Social",
  "Cultural",
  "Computer",
  "Literature",
  "Language",
  "Administrative",
  "Office",
  "Librarian",
  "Moral values",
  "Craft",
  "Mathematics",
  "English",
  "G. K",
  "Moral Science",
  "Drawing",
  "Singer",
  "Science",
  "Hindi",
  "Telugu",
  "EVS",
  "Dancer",
  "Catechism",
];
const languages = [
  "Assamese",
  "Bengali",
  "Bodo",
  "Dogri",
  "English",
  "French",
  "German",
  "Gujarati",
  "Hindi",
  "Italian",
  "Japanese",
  "Kannada",
  "Kashmiri",
  "Konkani",
  "Maithili",
  "Malayalam",
  "Manipuri",
  "Marathi",
  "Nepali",
  "Odia",
  "Portuguese",
  "Punjabi",
  "Russian",
  "Sanskrit",
  "Santali",
  "Sindhi",
  "Spanish",
  "Tamil",
  "Telugu",
  "Urdu",
  "Chinese (Mandarin)",
  "Arabic",
  "Dutch",
  "Korean",
  "Persian (Farsi)",
  "Swahili",
  "Turkish",
  "Thai",
  "Vietnamese",
];

const expertiseOptions = [
  "OTHER",
  "LANGUAGE AND LITERATURE",
  "LANGUAGE TEACHING",
  "GENERAL SCIENCE",
  "BASIC SOCIAL STUDIES",
  "SPORTS",
  "GENERAL MATHEMATICS",
  "FACULTY OF EDUCATION",
  "COMPUTER SCIENCES",
  "TEACHING",
  "TELUGU",
];

const currentlyTeachingClasses = [
  "Play school",
  "Non-teaching",
  "LKG-A",
  "LKG-B",
  "LKG-C",
  "UKG-A",
  "UKG-B",
  "UKG-C",
  "I-A",
  "I-B",
  "I-C",
  "II-A",
  "II-B",
  "II-C",
  "III-A",
  "III-B",
  "III-C",
  "IV-A",
  "IV-B",
  "IV-C",
  "V-A",
  "V-B",
  "V-C",
  "VI-A",
  "VI-B",
  "VI-C",
  "VII-A",
  "VII-B",
  "VII-C",
  "VIII-A",
  "VIII-B",
  "VIII-C",
  "IX-A",
  "IX-B",
  "IX-C",
  "X-A",
  "X-B",
  "X-C",
];

const useStyles = styled((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  fileInput: {
    display: "none",
  },
  previewImg: {
    display: "block",
    marginTop: theme.spacing(2),
    maxWidth: "100%",
    maxHeight: "200px",
  },
}));

const RegistrationForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const initialstate = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    qualifications: "",
    contact: "",
    regid: "",
    department: "",
    actingClassTeacherFor: "",
    expertise: [],
    currentlyTeaching: [],
    additionalTeachingDepartments: [],
    additionalTeachingClasses: [],
    languages: [],
    hobbies: "",
    profileImage: null,
    termsAccepted: false,
  };
  const [values, setValues] = useState(initialstate);

  const [errors, setErrors] = useState({});
  const regstate = useSelector((state) => state.registerUserReducer);
  const { error, loading, success } = regstate;

  const [previewImage, setPreviewImage] = useState(null);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleExpertiseChange = (event, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      expertise: newValue,
    }));
  };
  const handleCurrentlyTeaching = (event, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      currentlyTeaching: newValue,
    }));
  };
  const handleAdditionalTeachingClasses = (event, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      additionalTeachingClasses: newValue,
    }));
  };
  const handleAdditionalTeachingDepartments = (event, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      additionalTeachingDepartments: newValue,
    }));
  };
  const handleLanguages = (event, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      languages: newValue,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setValues((prevValues) => ({
      ...prevValues,
      profileImage: file,
    }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    try {
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        const submitdata = new FormData();
        submitdata.append("name", values.name);
        submitdata.append("regId", values.regid);
        submitdata.append("email", values.email);
        submitdata.append("department", values.department);
        submitdata.append("languages", values.languages);
        submitdata.append("qualifications", values.qualifications);
        submitdata.append("currentlyTeaching", values.currentlyTeaching);
        submitdata.append(
          "actingClassTeacherFor",
          values.actingClassTeacherFor
        );
        submitdata.append(
          "additionalTeachingClasses",
          values.additionalTeachingClasses
        );
        submitdata.append(
          "additionalTeachingDepartments",
          values.additionalTeachingDepartments
        );
        submitdata.append("contact", values.contact);
        submitdata.append("expertise", values.expertise);
        submitdata.append("hobbies", values.hobbies);
        submitdata.append("password", values.password);
        submitdata.append("profileimg", values.profileImage);
        dispatch(registerUser(submitdata));
        toast("Registration successfull");
        setValues(initialstate);
        setPreviewImage(null);
      }
    } catch (error) {}
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must beat least 8 characters";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!values.contact) {
      errors.contact = "Contact is required";
    } else if (!/^\d{10}$/.test(values.contact)) {
      errors.contact = "Please enter 10 digit number";
    }

    if (!values.regid) {
      errors.regid = "Registration ID is required";
    }
    if (!values.qualifications) {
      errors.qualifications = "Qualification is required";
    }
    if (!values.department) {
      errors.department = "Department is required";
    }
    if (!values.actingClassTeacherFor) {
      errors.actingClassTeacherFor = "actingClassTeacherFor is required";
    }

    if (values.expertise.length === 0) {
      errors.expertise = "Teaching expertise is required";
    }
    if (values.currentlyTeaching.length === 0) {
      errors.currentlyTeaching = "Currently teaching class is required";
    }
    if (values.additionalTeachingClasses.length === 0) {
      errors.additionalTeachingClasses =
        "Additional teaching classes is required";
    }
    if (values.additionalTeachingDepartments.length === 0) {
      errors.additionalTeachingDepartments =
        "Additional teaching Departments is required";
    }
    if (values.languages.length === 0) {
      errors.languages = "Languages is required";
    }
    if (!values.hobbies) {
      errors.hobbies = "hobbies is required";
    }

    if (!values.profileImage) {
      errors.profileImage = "Profile image is required";
    }

    if (!values.termsAccepted) {
      errors.termsAccepted = "Terms and conditions must be accepted";
    }

    return errors;
  };
  if (loading) {
    return <CircularProgress sx={{ textAlign: "center" }} />;
  }
  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <form
      style={{ backgroundColor: "#2196f3", height: "100%" }}
      onSubmit={handleSubmit}
    >
      {success && <ToastContainer />}
      <Container sx={{ p: { xs: 1, md: 5 } }}>
        <Grid
          component={Container}
          container
          spacing={2}
          sx={{
            px: 5,
            py: 2,
            bgcolor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={logo}
            href="/"
            sx={{
              m: 2,
              display: { xs: "none", md: "flex" },
              width: "5%",
            }}
          />
          <Grid item xs={12}>
            <Typography variant="h4">Registration Form</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              size="small"
              variant="standard"
              label="Name"
              fullWidth
              name="name"
              value={values.name}
              onChange={handleChange}
              error={errors.name !== undefined}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              size="small"
              variant="standard"
              label="Email"
              fullWidth
              name="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email !== undefined}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              size="small"
              variant="standard"
              name="password"
              label="Password"
              type="password"
              fullWidth
              value={values.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              size="small"
              variant="standard"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              value={values.confirmPassword}
              onChange={handleChange}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              size="small"
              variant="standard"
              label="Contact"
              fullWidth
              name="contact"
              value={values.contact}
              onChange={handleChange}
              error={errors.contact !== undefined}
              helperText={errors.contact}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              size="small"
              variant="standard"
              label="Registration ID"
              fullWidth
              name="regid"
              value={values.regid}
              onChange={handleChange}
              error={errors.regid !== undefined}
              helperText={errors.regid}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              size="small"
              variant="standard"
              label="Qualifications"
              fullWidth
              name="qualifications"
              value={values.qualifications}
              onChange={handleChange}
              error={errors.qualifications !== undefined}
              helperText={"please include comma after each qualification "}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl
              fullWidth
              className={classes.formControl}
              error={errors.department !== undefined}
            >
              <InputLabel id="department-label">Department</InputLabel>
              <Select
                required
                size="small"
                variant="standard"
                labelId="department-label"
                name="department"
                value={values.department}
                onChange={handleChange}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept.value} value={dept.value}>
                    {dept.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.department}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl
              fullWidth
              className={classes.formControl}
              error={errors.actingClassTeacherFor !== undefined}
            >
              <InputLabel id="actingClassTeacherFor-label">
                actingClassTeacherFor
              </InputLabel>
              <Select
                required
                size="small"
                variant="standard"
                labelId="actingClassTeacherFor-label"
                name="actingClassTeacherFor"
                value={values.actingClassTeacherFor}
                onChange={handleChange}
              >
                {actingClassTeacherFor.map((dept, i) => (
                  <MenuItem key={i} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.actingClassTeacherFor}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Autocomplete
              multiple
              options={expertiseOptions}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  size="small"
                  variant="standard"
                  {...params}
                  label="Teaching Expertise"
                  placeholder="Select expertise"
                  error={errors.expertise !== undefined}
                  helperText={errors.expertise}
                />
              )}
              value={values.expertise}
              onChange={handleExpertiseChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Autocomplete
              multiple
              options={currentlyTeachingClasses}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  size="small"
                  variant="standard"
                  {...params}
                  label="Currently teaching"
                  placeholder="select classes"
                  error={errors.currentlyTeaching !== undefined}
                  helperText={errors.currentlyTeaching}
                />
              )}
              value={values.currentlyTeaching}
              onChange={handleCurrentlyTeaching}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Autocomplete
              multiple
              options={additionalTeachingclasses}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  size="small"
                  variant="standard"
                  {...params}
                  label="Additional Teaching Classes"
                  placeholder="select  classes"
                  error={errors.additionalTeachingClasses !== undefined}
                  helperText={errors.additionalTeachingClasses}
                />
              )}
              value={values.additionalTeachingClasses}
              onChange={handleAdditionalTeachingClasses}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Autocomplete
              multiple
              options={additionalteachingdepts}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  size="small"
                  variant="standard"
                  {...params}
                  label="Additional Teaching departments"
                  placeholder="select  departments"
                  error={errors.additionalTeachingDepartments !== undefined}
                  helperText={errors.additionalTeachingDepartments}
                />
              )}
              value={values.additionalTeachingDepartments}
              onChange={handleAdditionalTeachingDepartments}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              size="small"
              variant="standard"
              label="Hobbies"
              fullWidth
              name="hobbies"
              value={values.hobbies}
              onChange={handleChange}
              error={errors.hobbies !== undefined}
              helperText={errors.hobbies}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Autocomplete
              multiple
              options={languages}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  size="small"
                  variant="standard"
                  {...params}
                  label="Languages"
                  placeholder="select  languages"
                  error={errors.languages !== undefined}
                  helperText={errors.languages}
                />
              )}
              value={values.languages}
              onChange={handleLanguages}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack direction={"column"} spacing={2}>
              <input
                accept="image/*"
                className={classes.fileInput}
                id="profile-image"
                type="file"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <label htmlFor="profile-image">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  fullWidth
                >
                  Upload Profile Image
                </Button>
              </label>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  style={{ width: "200px", height: "200px", margin: "50px" }}
                />
              )}
              {errors.profileImage && (
                <FormHelperText error>{errors.profileImage}</FormHelperText>
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.termsAccepted}
                    onChange={(event) =>
                      setValues((prevValues) => ({
                        ...prevValues,
                        termsAccepted: event.target.checked,
                      }))
                    }
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    I accept the terms and conditions
                  </Typography>
                }
              />
              {errors.termsAccepted && (
                <FormHelperText error>{errors.termsAccepted}</FormHelperText>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};

export default RegistrationForm;

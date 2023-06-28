import { useCallback, useState } from 'react';
import { Button, TextField, Grid, Select, MenuItem, InputLabel, FormControl, Checkbox, FormControlLabel, FormHelperText, FormLabel, FormGroup, Input } from '@mui/material';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [registrationId, setRegistrationId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [qualification, setQualification] = useState('');
  const [teachingExpertise, setTeachingExpertise] = useState('');
  const [department, setDepartment] = useState('');
  const [isClassTeacher, setIsClassTeacher] = useState(false);
  const [classTeacherFor, setClassTeacherFor] = useState('');
  const [currentlyTeaching, setCurrentlyTeaching] = useState('');
  const [additionalTeachingDepartments, setAdditionalTeachingDepartments] = useState([]);
  const [additionalTeachingClasses, setAdditionalTeachingClasses] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const handleNameChange = useCallback((event) => {
    setName(event.target.value);
  }, []);
  
  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);
  
  const handleContactChange = useCallback((event) => {
    setContact(event.target.value);
  }, []);
  
  const handleRegistrationIdChange = useCallback((event) => {
    setRegistrationId(event.target.value);
  }, []);
  
  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);
  
  const handleConfirmPasswordChange = useCallback((event) => {
    setConfirmPassword(event.target.value);
  }, []);
  
  const handleQualificationChange = useCallback((event) => {
    setQualification(event.target.value);
  }, []);
  
  const handleTeachingExpertiseChange = useCallback((event) => {
    setTeachingExpertise(event.target.value);
  }, []);
  
  const handleDepartmentChange = useCallback((event) => {
    setDepartment(event.target.value);
  }, []);
  
  const handleClassTeacherForChange = useCallback((event) => {
    setClassTeacherFor(event.target.value);
  }, []);
  
  const handleCurrentlyTeachingChange = useCallback((event) => {
    setCurrentlyTeaching(event.target.value);
  }, []);
  
  const handleAdditionalTeachingDepartmentsChange = useCallback((event) => {
    setAdditionalTeachingDepartments(event.target.value);
  }, []);
  
  const handleAdditionalTeachingClassesChange = useCallback((event) => {
    setAdditionalTeachingClasses(event.target.value);
  }, []);
  const handleAdditionalTeachingClassesChange = useCallback((checked, language) => {
    if (checked) {
      setAdditionalTeachingClasses([...languages, language]);
    } else {
      setLanguages(languages.filter((lang) => lang !== language));
    }
  }, [languages]);
  const handleLanguagesChange = useCallback((checked, language) => {
    if (checked) {
      setLanguages([...languages, language]);
    } else {
      setLanguages(languages.filter((lang) => lang !== language));
    }
  }, [languages]);
  
  const handleHobbiesChange = useCallback((checked, hobby) => {
    if (checked) {
      setHobbies([...hobbies, hobby]);
    } else {
      setHobbies(hobbies.filter((hob) => hob !== hobby));
    }
  }, [hobbies]);
  
  const validate = () => {
    const errors = {};
    if (!name) errors.name = 'Name is required';
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    if (!contact) errors.contact = 'Contact is required';
    else if (!/^\d{10}$/.test(contact)) errors.contact = 'Contact is invalid';
    if (!registrationId) errors.registrationId = 'Registration ID is required';
    if (!password) errors.password = 'Password is required';
    if (!confirmPassword) errors.confirmPassword = 'Confirm password is required';
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (!qualification) errors.qualification = 'Qualification is required';
    if (!teachingExpertise) errors.teachingExpertise = 'Teaching expertise is required';
    if (!department) errors.department = 'Department is required';
    if (isClassTeacher && !classTeacherFor) errors.classTeacherFor = 'Class teacher for is required';
    if (!currentlyTeaching) errors.currentlyTeaching = 'Currently teaching is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      // submit form to backend
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('contact', contact);
      formData.append('registrationId', registrationId);
      formData.append('password', password);
      formData.append('qualification', qualification);
      formData.append('teachingExpertise', teachingExpertise);
      formData.append('department', department);
      formData.append('isClassTeacher', isClassTeacher);
      formData.append('classTeacherFor', classTeacherFor);
      formData.append('currentlyTeaching', currentlyTeaching);
      additionalTeachingDepartments.forEach((dept) => formData.append('additionalTeachingDepartments[]', dept));
      additionalTeachingClasses.forEach((cls) => formData.append('additionalTeachingClasses[]', cls));
     
      languages.forEach((lang) => formData.append('languages[]', lang));
      hobbies.forEach((hobby) => formData.append('hobbies[]', hobby));
      formData.append('profileImage', profileImage);
    
      fetch('/api/register', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // handle success response from backend
      })
      .catch(error => {
        console.error(error);
        // handle error response from backend
      });
    }
}

return (
<form onSubmit={handleSubmit}>
<Grid container spacing={2}>
<Grid item xs={12} sm={6}>
<TextField
label="Name"
fullWidth
value={name}
onChange={(e) => setName(e.target.value)}
error={!!errors.name}
helperText={errors.name}
/>
</Grid>
<Grid item xs={12} sm={6}>
<TextField
label="Email"
fullWidth
value={email}
onChange={(e) => setEmail(e.target.value)}
error={!!errors.email}
helperText={errors.email}
/>
</Grid>
<Grid item xs={12} sm={6}>
<TextField
label="Contact"
fullWidth
value={contact}
onChange={(e) => setContact(e.target.value)}
error={!!errors.contact}
helperText={errors.contact}
/>
</Grid>
<Grid item xs={12} sm={6}>
<TextField
label="Registration ID"
fullWidth
value={registrationId}
onChange={(e) => setRegistrationId(e.target.value)}
error={!!errors.registrationId}
helperText={errors.registrationId}
/>
</Grid>
<Grid item xs={12} sm={6}>
<TextField
label="Password"
type="password"
fullWidth
value={password}
onChange={(e) => setPassword(e.target.value)}
error={!!errors.password}
helperText={errors.password}
/>
</Grid>
<Grid item xs={12} sm={6}>
<TextField
label="Confirm Password"
type="password"
fullWidth
value={confirmPassword}
onChange={(e) => setConfirmPassword(e.target.value)}
error={!!errors.confirmPassword}
helperText={errors.confirmPassword}
/>
</Grid>
<Grid item xs={12} sm={6}>
<TextField
label="Qualification"
fullWidth
value={qualification}
onChange={(e) => setQualification(e.target.value)}
error={!!errors.qualification}
helperText={errors.qualification}
/>
</Grid>
<Grid item xs={12} sm={6}>
<TextField
label="Teaching Expertise"
fullWidth
value={teachingExpertise}
onChange={(e) => setTeachingExpertise(e.target.value)}
error={!!errors.teachingExpertise}
helperText={errors.teachingExpertise}
/>
</Grid>
<Grid item xs={12} sm={6}>
<FormControl fullWidth error={!!errors.department}>
<InputLabel>Department</InputLabel>
<Select
value={department}
onChange={(e) => setDepartment(e.target.value)}
>
<MenuItem value="">-- Select department --</MenuItem>
<MenuItem value="Mathematics">Mathematics</MenuItem>
<MenuItem value="Science">Science</MenuItem>
<MenuItem value="Social Studies">Social Studies</MenuItem>
</Select>
{errors.department && <FormHelperText>{errors.department}</FormHelperText>} 
</FormControl>
</Grid>
    <Grid item xs={12} sm={6}>
      <FormControl fullWidth error={!!errors.classTeacherFor}>
        <InputLabel>Class Teacher for</InputLabel>
        <Select
          value={classTeacherFor}
          onChange={(e) => setClassTeacherFor(e.target.value)}
        >
          <MenuItem value="">-- Select class --</MenuItem>
          <MenuItem value="Class 1">Class 1</MenuItem>
          <MenuItem value="Class 2">Class 2</MenuItem>
          <MenuItem value="Class 3">Class 3</MenuItem>
        </Select>
        {errors.classTeacherFor && <FormHelperText>{errors.classTeacherFor}</FormHelperText>}
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">Currently Teaching</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={currentlyTeaching.includes('Class 1')} onChange={(e) => handleCurrentlyTeachingChange(e.target.checked, 'Class 1')} />}
            label="Class 1"
          />
          <FormControlLabel
            control={<Checkbox checked={currentlyTeaching.includes('Class 2')} onChange={(e) => handleCurrentlyTeachingChange(e.target.checked, 'Class 2')} />}
            label="Class 2"
          />
          <FormControlLabel
            control={<Checkbox checked={currentlyTeaching.includes('Class 3')} onChange={(e) => handleCurrentlyTeachingChange(e.target.checked, 'Class 3')} />}
            label="Class 3"
          />
        </FormGroup>
        {errors.currentlyTeaching && <FormHelperText>{errors.currentlyTeaching}</FormHelperText>}
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">Additional Teaching Departments</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={additionalTeachingDepartments.includes('Mathematics')} onChange={(e) => handleAdditionalTeachingDepartmentsChange(e.target.checked, 'Mathematics')} />}
            label="Mathematics"
          />
          <FormControlLabel
            control={<Checkbox checked={additionalTeachingDepartments.includes('Science')} onChange={(e) => handleAdditionalTeachingDepartmentsChange(e.target.checked, 'Science')} />}
            label="Science"
          />
          <FormControlLabel
            control={<Checkbox checked={additionalTeachingDepartments.includes('Social Studies')} onChange={(e) => handleAdditionalTeachingDepartmentsChange(e.target.checked, 'Social Studies')} />}
            label="Social Studies"
          />
        </FormGroup>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">Additional Teaching Classes</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={additionalTeachingClasses.includes('Class 1')} onChange={(e) => handleAdditionalTeachingClassesChange(e.target.checked, 'Class 1')} />}
            label="Class 1"
          />
          <FormControlLabel
            control={<Checkbox checked={additionalTeachingClasses.includes('Class 2')} onChange={(e) => handleAdditionalTeachingClassesChange(e.target.checked, 'Class 2')} />}
            label="Class 2"
          />
          <FormControlLabel
            control={<Checkbox checked={additionalTeachingClasses.includes('Class 3')} onChange={(e) => handleAdditionalTeachingClassesChange(e.target.checked, 'Class 3')} />}
            label="Class 3"
            />
            </FormGroup>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
            <FormControl component="fieldset" fullWidth error={!!errors.languages}>
            <FormLabel component="legend">Languages</FormLabel>
            <FormGroup>
            <FormControlLabel
            control={<Checkbox checked={languages.includes('English')} onChange={(e) => handleLanguagesChange(e.target.checked, 'English')} />}
            label="English"
            />
            <FormControlLabel
            control={<Checkbox checked={languages.includes('French')} onChange={(e) => handleLanguagesChange(e.target.checked, 'French')} />}
            label="French"
            />
            <FormControlLabel
            control={<Checkbox checked={languages.includes('Spanish')} onChange={(e) => handleLanguagesChange(e.target.checked, 'Spanish')} />}
            label="Spanish"
            />
            </FormGroup>
            {errors.languages && <FormHelperText>{errors.languages}</FormHelperText>}
            </FormControl>
            </Grid>
            <Grid item xs={12}>
            <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Hobbies</FormLabel>
            <FormGroup>
            <FormControlLabel
            control={<Checkbox checked={hobbies.includes('Reading')} onChange={(e) => handleHobbiesChange(e.target.checked, 'Reading')} />}
            label="Reading"
            />
            <FormControlLabel
            control={<Checkbox checked={hobbies.includes('Writing')} onChange={(e) => handleHobbiesChange(e.target.checked, 'Writing')} />}
            label="Writing"
            />
            <FormControlLabel
            control={<Checkbox checked={hobbies.includes('Gardening')} onChange={(e) => handleHobbiesChange(e.target.checked, 'Gardening')} />}
            label="Gardening"
            />
            </FormGroup>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
            <InputLabel>Profile Image</InputLabel>
            <Input type="file" onChange={(e) => setProfileImage(e.target.files[0])} />
            </FormControl>
            </Grid>
            <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
            </Button>
            </Grid>
            </Grid>
            </form>
            );
            }
            
            export default RegistrationForm;
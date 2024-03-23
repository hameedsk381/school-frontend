import React, { useState ,useRef} from 'react';
import {
    Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';
import avatar from '../assets/avtar.png'
import REACT_API_URL from '../config';
import axios from 'axios';
const AdmForm = () => {
    const initialState = {
        studentName: '',
        gender: '',
        dateOfBirth: '',
        motherTongue: '',
        fatherName: '',
        fatherOccupation: '',
        motherName: '',
        motherOccupation: '',
        bankAccountNum: '',
        bankName: '',
        bankBranch: '',
        ifscCode: '',
        phoneNumber: '',
        whatsappNumber: '',
        guardianName: '',
        guardianOccupation: '',
        nationality: '',
        caste: '',
        subCaste: '',
        residentialAddress: '',
        previousSchool: '',
        schoolCode: '',
        studiedClass: '',
        medium: '',
        isEligibleForPromotion: false,
        daysPresentInPreviousSchool: '',
        transferCertificateNum: '',
        classJoined: '',
        childInfoNum: '',
        firstLanguage: '',
        secondLanguage: '',
        personalMarksIdentification1: '',
        personalMarksIdentification2: '',
        remarks: '',
        acceptTerms: false,
        signature: '',
        passportPhoto: avatar,
      }
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const signatureRef = useRef({});
  const [snack, setShowsnack] = useState(false);
  const [snackmsg,setSnackmsg] = useState('');
  const [snacktype,setSnacktype] = useState('info');
  const [loading,setLoading] = useState(false)
  const nationalityOptions = ['India', 'America', 'Canada', 'Australia', 'United Kingdom', 'Germany', 'France', 'Japan', 'China', 'Brazil', 'South Africa', 'Russia', 'Italy', 'Spain', 'Mexico', 'Argentina', 'Nigeria', 'Indonesia', 'Pakistan', 'Bangladesh', 'Philippines', 'Vietnam', 'Turkey', 'Iran', 'Thailand', 'Myanmar', 'South Korea', 'Kenya', 'Colombia', 'Spain', 'Ukraine', 'Tanzania', 'Argentina', 'Algeria', 'Uganda', 'Sudan', 'Iraq', 'Poland', 'Canada', 'Morocco', 'Afghanistan', 'Saudi Arabia', 'Peru', 'Venezuela', 'Malaysia', 'Uzbekistan', 'Mozambique', 'Ghana', 'Yemen', 'Nepal', 'Venezuela', 'Madagascar', 'Cameroon', 'Côte dIvoire', 'North Korea', 'Australia', 'Niger', 'Taiwan', 'Sri Lanka', 'Burkina Faso', 'Mali', 'Romania', 'Malawi', 'Chile', 'Kazakhstan', 'Zambia', 'Guatemala', 'Ecuador', 'Syria', 'Netherlands', 'Senegal', 'Cambodia', 'Chad', 'Somalia', 'Zimbabwe', 'Guinea', 'Rwanda', 'Benin', 'Burundi', 'Tunisia', 'Bolivia', 'Belgium', 'Haiti', 'Cuba', 'South Sudan', 'Dominican Republic', 'Czech Republic', 'Greece', 'Jordan', 'Portugal', 'Azerbaijan', 'Sweden', 'Honduras', 'United Arab Emirates', 'Hungary', 'Tajikistan', 'Belarus', 'Austria', 'Papua New Guinea', 'Serbia', 'Israel', 'Switzerland', 'Togo', 'Sierra Leone', 'Hong Kong', 'Laos', 'Paraguay', 'Bulgaria', 'Libya', 'Lebanon', 'Nicaragua', 'Kyrgyzstan', 'El Salvador', 'Turkmenistan', 'Singapore', 'Denmark', 'Finland', 'Slovakia', 'Norway', 'Oman', 'State of Palestine', 'Costa Rica', 'Liberia', 'Ireland', 'Central African Republic', 'New Zealand', 'Mauritania', 'Panama', 'Kuwait', 'Croatia', 'Moldova', 'Georgia', 'Eritrea', 'Uruguay', 'Bosnia and Herzegovina', 'Mongolia', 'Armenia', 'Jamaica', 'Qatar', 'Albania', 'Puerto Rico', 'Lithuania', 'Namibia', 'Gambia', 'Botswana', 'Gabon', 'Lesotho', 'North Macedonia', 'Slovenia', 'Guinea-Bissau', 'Latvia', 'Bahrain', 'Trinidad and Tobago', 'Estonia', 'Timor-Leste', 'Mauritius', 'Cyprus', 'Eswatini', 'Djibouti', 'Fiji', 'Réunion', 'Comoros', 'Guyana', 'Bhutan', 'Solomon Islands', 'Macau', 'Montenegro', 'Luxembourg', 'Western Sahara', 'Suriname', 'Cabo Verde', 'Maldives', 'Malta', 'Brunei', 'Belize', 'Bahamas', 'Iceland', 'Vanuatu', 'Barbados', 'São Tomé and Príncipe', 'Samoa', 'Saint Lucia', 'Kiribati', 'Grenada', 'Tonga', 'Federated States of Micronesia', 'Saint Vincent and the Grenadines', 'Antigua and Barbuda', 'Andorra', 'Dominica', 'Marshall Islands', 'Saint Kitts and Nevis', 'Monaco', 'Liechtenstein', 'San Marino', 'Palau', 'Tuvalu', 'Nauru'];



  // Mother Tongue options (South Indian languages)
const motherTongueOptions = [
    'English',
    'Telugu',
    'Tamil',
    'Urdu',
    'Kannada',
    'Hindi',
    'Bengali',
    'Marathi',
'Gujarati',
'Odia',
    'Punjabi',
    'Malayalam',
    'Sindhi',
    'Assamese',
    'Maithili',
    'Haryanvi',
  'koya',
    'lambadi',
    'Bhojpuri'
  ];
  const classOptions = ['LKG','UKG',1,2,3,4,5,6,7,8,9,10]
  // Nationality options
  
  // Caste options
  const casteOptions = ['OC', 'BC', 'SC', 'ST'];
  
  // Medium options
  const mediumOptions = ['English', 'Telugu', 'Hindi'];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0]
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  const handleSnack = () =>{
    setShowsnack(true)
  }
  const validateForm = (data) => {
    const errors = {};
  
    // Student Name
    if (!data.studentName.trim()) {
      errors.studentName = 'Student name is required';
    }
  
    // Gender
    if (!data.gender) {
      errors.gender = 'Gender is required';
    }
  
    // Date of Birth
    if (!data.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    }
  
    // Mother Tongue
    if (!data.motherTongue) {
      errors.motherTongue = 'Mother tongue is required';
    }
  
    // Father's Name
    if (!data.fatherName.trim()) {
      errors.fatherName = 'Father\'s name is required';
    }
  
    // Father's Occupation
    if (!data.fatherOccupation.trim()) {
      errors.fatherOccupation = 'Father\'s occupation is required';
    }
  
    // Mother's Name
    if (!data.motherName.trim()) {
      errors.motherName = 'Mother\'s name is required';
    }
  
    // Mother's Occupation
    if (!data.motherOccupation.trim()) {
      errors.motherOccupation = 'Mother\'s occupation is required';
    }
  
    // Bank Account Number
    if (!data.bankAccountNum.trim() || data.bankAccountNum.length < 12 || data.bankAccountNum.length > 16) {
      errors.bankAccountNum = 'Please enter valid bank account number';
    }
    // Bank Name
    if (!data.bankName.trim()) {
      errors.bankName = 'Bank name is required';
    }
  
    // Bank Branch
    if (!data.bankBranch.trim()) {
      errors.bankBranch = 'Bank branch is required';
    }
  
    // IFSC Code
    if (!data.ifscCode.trim() || data.ifscCode.length !== 11) {
      errors.ifscCode = 'IFSC code is required and should be 11 characters long';
    }
  
    // Validate Mobile Number
    if (!data.phoneNumber.trim() || data.phoneNumber.length !== 10) {
      errors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    // WhatsApp Number
    if (!data.whatsappNumber.trim()|| data.phoneNumber.length !== 10) {
      errors.whatsappNumber = 'WhatsApp number is required';
    }
    // Nationality
    if (!data.nationality) {
      errors.nationality = 'Nationality is required';
    }
  
    // Caste
    if (!data.caste) {
      errors.caste = 'Caste is required';
    }
  
    // Sub Caste
    if (!data.subCaste.trim()) {
      errors.subCaste = 'Sub caste is required';
    }
  
    // Residential Address
    if (!data.residentialAddress.trim()) {
      errors.residentialAddress = 'Residential address is required';
    }
  
    // Previous School
    if (!data.previousSchool.trim()) {
      errors.previousSchool = 'Previous school is required';
    }
  
    // School Code
    if (!data.schoolCode.trim()) {
      errors.schoolCode = 'School code is required';
    }
  
    // Studied Class
    if (!data.studiedClass) {
      errors.studiedClass = 'Studied class is required';
    }
  
    // Medium
    if (!data.medium) {
      errors.medium = 'Medium is required';
    }
  
    // Days Present in Previous School
    if (!data.daysPresentInPreviousSchool) {
      errors.daysPresentInPreviousSchool = 'Number of days attended is required';
    }
  
    // Transfer Certificate Number
    if (!data.transferCertificateNum.trim()) {
      errors.transferCertificateNum = 'Transfer certificate number is required';
    }
  
    // Class Joined
    if (!data.classJoined) {
      errors.classJoined = 'Class joined is required';
    }
  
    // Child Info Number
    if (!data.childInfoNum.trim()) {
      errors.childInfoNum = 'Child info number is required';
    }
  
    // First Language Opted
    if (!data.firstLanguage.trim()) {
      errors.firstLanguage = 'First language opted is required';
    }
  
    // Second Language Opted
    if (!data.secondLanguage.trim()) {
      errors.secondLanguage = 'Second language opted is required';
    }
  
    // Personal Mark for Identification 1
    if (!data.personalMarksIdentification1.trim()) {
      errors.personalMarksIdentification1 = 'Personal mark for identification 1 is required';
    }
  
    // Personal Mark for Identification 2
    if (!data.personalMarksIdentification2.trim()) {
      errors.personalMarksIdentification2 = 'Personal mark for identification 2 is required';
    }
  
    // Remarks
    if (!data.remarks.trim()) {
      errors.remarks = 'Remarks are required';
    }
  
    // Accept Terms and Conditions
    if (!data.acceptTerms) {
      errors.acceptTerms = 'You must accept the terms and conditions';
    }
  
    // Signature
    if (signatureRef.current.isEmpty()) {
      errors.signature = 'Please sign the application in the signature field';
    }
  
    // Passport Photo
    if (!data.passportPhoto) {
      errors.passportPhoto = 'Passport photo is required';
    }
  
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const errors = validateForm(formData);

      if (Object.keys(errors).length === 0) {
        const signatureData = signatureRef.current.getTrimmedCanvas().toDataURL('image/png');
   // Convert data URL to Blob
   fetch(signatureData)
   .then(res => res.blob())
   .then(blob => {
     // Create a File object from the Blob
     const signfile = new File([blob], 'signature.png', { type: 'image/png' });
     setFormData((prevState) => ({
        ...prevState,
        signature: signfile
      }));
     // Now you have the File object, you can use it as needed
   });
const filedata = new FormData();
filedata.append('file',formData.signature);
    const response = await axios.post('https://reanarration-fastify-api.onrender.com/upload', filedata);
    const signatureFiledata = response.data;
        const formDataToSubmit = {};

        for (const [key, value] of Object.entries(formData)) {
          if (key === 'passportPhoto') {
            const passport = new FormData();
passport.append('file',value);
    const passresponse = await axios.post('https://reanarration-fastify-api.onrender.com/upload', passport);
    const passportdata = passresponse.data;
            formDataToSubmit[key] = passportdata;
          } else {
            formDataToSubmit[key] = value;
          }
        }

        formDataToSubmit.signature = signatureFiledata;

        const formresponse = await axios.post(`${REACT_API_URL}/admissions`, formDataToSubmit);
        console.log(formresponse.data)
        if (formresponse) {
            setLoading(false)
          setShowsnack(true);
          setSnackmsg(formresponse.data.message);
          setSnacktype('success');
        } else {
            setShowsnack(true);
            setSnackmsg('Error submitting form contact school');
            setSnacktype('error');
        }
      } else {
        setFormErrors(errors);
        setShowsnack(true);
        setSnackmsg('Please fill all necessary fields properly');
        setSnacktype('error');
        window.scrollTo(0, 0);
      }
    } catch (error) {
        setLoading(false)
      setShowsnack(true);
      setSnackmsg(error.message);
      setSnacktype('error');
    }
  };

  return (
    <Grid component={'form'} onSubmit={handleSubmit} container spacing={2} p={5}>
      <Grid item xs={12}>
        <Typography my={2} variant="h4" textAlign={'center'} gutterBottom>
          Admission Form
        </Typography>
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="studentName"
          label="Student Name"
          value={formData.studentName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!formErrors.studentName}
          helperText={formErrors.studentName}
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select variant='filled' 
            size="small"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            defaultValue=""
          >
            <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="boy">Boy</MenuItem>
            <MenuItem value="girl">Girl</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          {formErrors.gender && <FormHelperText>{formErrors.gender}</FormHelperText>}
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
        
          size="small"
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Mother Tongue</InputLabel>
          <Select variant='filled'
            size="small"
            name="motherTongue"
            value={formData.motherTongue}
            onChange={handleChange}
            
          >
            <MenuItem value="">Select Language</MenuItem>
            {motherTongueOptions.map((language) => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="fatherName"
          label="Father's Name"
          value={formData.fatherName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="fatherOccupation"
          label="Father's Occupation"
          value={formData.fatherOccupation}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="motherName"
          label="Mother's Name"
          value={formData.motherName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="motherOccupation"
          label="Mother's Occupation"
          value={formData.motherOccupation}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="bankAccountNum"
          label="Bank Account Number"
          value={formData.bankAccountNum}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="bankName"
          label="Bank Name"
          value={formData.bankName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="bankBranch"
          label="Bank Branch"
          value={formData.bankBranch}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="ifscCode"
          label="IFSC Code"
          value={formData.ifscCode}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="phoneNumber"
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="whatsappNumber"
          label="WhatsApp Number"
          value={formData.whatsappNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="guardianName"
          label="Guardian's Name"
          value={formData.guardianName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="guardianOccupation"
          label="Guardian's Occupation"
          value={formData.guardianOccupation}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Nationality</InputLabel>
          <Select variant='filled'
            size="small"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
          >
            <MenuItem value="">Select Nationality</MenuItem>
            {nationalityOptions.map((nation) => (
              <MenuItem key={nation} value={nation}>
                {nation}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={3}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Caste</InputLabel>
          <Select variant='filled'
            size="small"
            name="caste"
            value={formData.caste}
            onChange={handleChange}
          >
            <MenuItem value="">Select Caste</MenuItem>
            {casteOptions.map((caste) => (
              <MenuItem key={caste} value={caste}>
                {caste}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="subCaste"
          label="Sub Caste"
          value={formData.subCaste}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField 
          size="small"
          name="residentialAddress"
          label="Residential Address"
          value={formData.residentialAddress}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="previousSchool"
          label="Previous School"
          value={formData.previousSchool}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="schoolCode"
          label="School Code"
          value={formData.schoolCode}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

     <Grid item xs={12} sm={3}>
     <FormControl fullWidth margin="normal">
        <InputLabel>Studied Class</InputLabel>
        <Select variant='filled'
          size="small"
          name="studiedClass"
          value={formData.studiedClass}
          onChange={handleChange}
          
        >
          <MenuItem value="">Select Class</MenuItem>
          {classOptions.map((className) => (
            <MenuItem key={className} value={className}>
              {className}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
     </Grid>

      <Grid item xs={12} sm={3}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Medium</InputLabel>
          <Select variant='filled'
            size="small"
            name="medium"
            value={formData.medium}
            onChange={handleChange}
          >
            <MenuItem value="">Select Medium</MenuItem>
            {mediumOptions.map((medium) => (
              <MenuItem key={medium} value={medium}>
                {medium}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="isEligibleForPromotion"
              checked={formData.isEligibleForPromotion}
              onChange={handleChange}
              
            />
          }
          label="Are you eligible for promotion to next class?"
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="daysPresentInPreviousSchool"
          label="Number of days attended in previous school since admission"
          value={formData.daysPresentInPreviousSchool}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="transferCertificateNum"
          label="Number of Transfer Certificate"
          value={formData.transferCertificateNum}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Class Joined</InputLabel>
          <Select variant='filled'
            size="small"
            name="classJoined"
            value={formData.classJoined}
            onChange={handleChange}
          >
            <MenuItem value="">Select Class</MenuItem>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((classNum) => (
              <MenuItem key={classNum} value={classNum}>
                {classNum}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="childInfoNum"
          label="Child Info Number"
          value={formData.childInfoNum}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <FormControl fullWidth margin="normal">
          <InputLabel>First Language Opted</InputLabel>
          <Select
            size="small"
            name="firstLanguage"
            value={formData.firstLanguage}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="">Select Language</MenuItem>
            {motherTongueOptions.map((language) => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={3}>
      <FormControl fullWidth margin="normal">
          <InputLabel>Second Language Opted</InputLabel>
          <Select
            size="small"
            name="secondLanguage"
            value={formData.secondLanguage}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="">Select Language</MenuItem>
            {motherTongueOptions.map((language) => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="personalMarksIdentification1"
          label="Personal Mark for Identification 1"
          value={formData.personalMarksIdentification1}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField 
          size="small"
          name="personalMarksIdentification2"
          label="Personal Mark for Identification 2"
          value={formData.personalMarksIdentification2}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField 
          size="small"
          name="remarks"
          label="Remarks"
          value={formData.remarks}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
      </Grid>

    
<Grid item xs={12} sm={6}>
<Typography my={2} variant="body1">Signature (use your fingers to draw the signature)</Typography>
  <Paper variant='outlined' >
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
      <Button onClick={() => { 
        if (signatureRef.current.isEmpty()) {
          alert('Signature cannot be empty');
        } else {
          signatureRef.current.clear(); 
        }
      }}>Clear Signature</Button>
    </Box>
    <SignatureCanvas
      ref={signatureRef}
      penColor="blue"
      canvasProps={{
        width: 600,
        height: 'auto',
        className: 'signature-canvas',
      }}
      maxWidth={3}
      velocityFilterWeight={0.9}
    />
  </Paper>
 
</Grid>
<Grid item xs={12} sm={6}>
  <Typography my={2} variant="body1">Passport Photo</Typography>
 <Stack component={Paper} variant='outlined' p={1} direction={'row'}>
 <input
    name='passportPhoto'
    type='file'
    accept="image/*"
    onChange={handleChange}
  />
  {formData.passportPhoto && formData.passportPhoto instanceof File ? (
      <img style={{width:"200px",height:'180px'}} src={URL.createObjectURL(formData.passportPhoto)} alt="Passport" />
    ) : (
      <img style={{width:"200px",height:'180px'}} src={formData.passportPhoto} alt="Passport" />
    )}
 </Stack>
</Grid>
<Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              
            />
          }
          label="Accept Terms and Conditions"
        />
      </Grid>

      <Button sx={{my:2,width:'25%',m:'auto'}} type="submit" disabled={loading} variant="contained" fullWidth>
       {loading ? <CircularProgress  sx={{m:'auto'}}/> : 'Submit'}
      </Button>
     


       <Snackbar  
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }} 
          open={snack} 
          autoHideDuration={3000} 
          onClose={() => setShowsnack(false)}
        >
         <Alert  severity={snacktype}>
         {snackmsg}
         </Alert>
       </Snackbar>
    </Grid>
  );
};

export default AdmForm;
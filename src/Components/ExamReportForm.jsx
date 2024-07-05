import React, { useEffect, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { Container, RadioGroup, FormControlLabel, Radio, CircularProgress } from '@mui/material'; // Added CircularProgress
import axios from 'axios';
import REACT_API_URL from '../config';

const ExamReportForm = ({ onSubmit, reportId }) => {
  const loginstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = loginstate;
  const classTeacher = currentUser.classTeacherName.name;

  const { handleSubmit, control, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: {
      studentId: '',
      examType: '',
      dateOfExam: '',
      classId: classTeacher,
      subjects: []
    }
  });

  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [subjectsFetched, setSubjectsFetched] = useState(false);
  const { fields, append, remove, update } = useFieldArray({ control, name: 'subjects' });

  const [loadingSubmit, setLoadingSubmit] = useState(false); // Added loading state for submit

  useEffect(() => {
    const getClassesAndSubjects = async () => {
      try {
        const response = await axios.get(`${REACT_API_URL}/subjects`);
        setSubjects(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    getClassesAndSubjects();
  }, []);

  useEffect(() => {
    const fetchReportDetails = async () => {
      if (reportId) {
        try {
          const response = await axios.get(`${REACT_API_URL}/exams/${reportId}`);
          const data = response.data;
          Object.keys(data).forEach(key => {
            if (key === 'subjects') {
              setValue('subjects', data[key].map(subject => ({ subjectName: subject.subjectName.name, marks: subject.marks, attendance: subject.attendance })));
            } else if (key === 'dateOfExam') {
              setValue('dateOfExam', new Date(data[key]).toISOString().split('T')[0]); // Display exam date in readable format
            } else {
              setValue(key, data[key]);
            }
          });
        } catch (error) {
          console.error('Error fetching report details:', error);
        }
      }
    };

    fetchReportDetails();
  }, [reportId, setValue]);

  useEffect(() => {
    if (subjects.length > 0 && !subjectsFetched) {
      // Populate the subjects array with default subjects and marks
      subjects.forEach(subject => append({ subjectName: subject.name, marks: '', attendance: 'Present' }));
      setSubjectsFetched(true); // Set subjects fetched to true to prevent re-appending
    }
  }, [subjects, append, subjectsFetched]);

  const handleAddSubject = () => {
    append({ subjectName: newSubject, marks: '0', attendance: 'Present' });
    setNewSubject('');
  };

  const handleAttendanceChange = (index, value) => {
    const updatedSubjects = [...fields];
    updatedSubjects[index].attendance = value;
    if (value === 'Absent') {
      updatedSubjects[index].marks = 0;
    } else {
      updatedSubjects[index].marks = '';
    }
    update(index, updatedSubjects[index]);
  };

  const validateMarks = (value) => {
    if (value < 0 || value > 100) {
      return 'Marks must be between 0 and 100';
    }
    return true;
  };

  return (
    <Container component={'form'} onSubmit={handleSubmit(async (data) => {
      setLoadingSubmit(true); // Show loader for submit
      await onSubmit(data);
      setLoadingSubmit(false); // Hide loader for submit
    })}>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12} md={3}>
          <Controller
            name="studentId"
            control={control}
            rules={{ required: 'Student ID is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Student Roll Num"
                variant="outlined"
                error={!!errors.studentId}
                helperText={errors.studentId ? errors.studentId.message : ''}
                fullWidth
                margin="normal"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Controller
            name="examType"
            control={control}
            rules={{ required: 'Exam type is required' }}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel>Exam Type</InputLabel>
                <Select
                  {...field}
                  label="Exam Type"
                  error={!!errors.examType}
                >
                  {['Half-yearly', 'Annual', 'Mid-1', 'Mid-2', 'Mid-3', 'Mid4','Unit','Slip-test'].map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
                {errors.examType && <p style={{ color: 'red' }}>{errors.examType.message}</p>}
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Controller
            name="dateOfExam"
            control={control}
            rules={{ required: 'Date of exam is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Date of Exam"
                type="date" // Changed to date format for display
                variant="outlined"
                error={!!errors.dateOfExam}
                helperText={errors.dateOfExam ? errors.dateOfExam.message : ''}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Controller
            name="classId"
            control={control}
            defaultValue={classTeacher}
            render={({ field }) => (
              <TextField
                {...field}
                label="Class"
                variant="outlined"
                fullWidth
                margin="normal"
                value={classTeacher}
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
          />
        </Grid>
      </Grid>
      <h3>Subjects and Marks</h3>
      {fields.map((field, index) => (
        <Grid container spacing={2} direction={'row'} key={field.id}>
          <Grid item sm={12} md={3}>
            <Controller
              name={`subjects[${index}].subjectName`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Subject Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item sm={12} md={3}>
            <Controller
              name={`subjects[${index}].marks`}
              control={control}
              rules={{ required: 'Marks is required', validate: validateMarks }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Marks"
                  type="number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: getValues(`subjects[${index}].attendance`) === 'Absent',
                  }}
                  error={!!errors?.subjects?.[index]?.marks}
                  helperText={errors?.subjects?.[index]?.marks ? errors?.subjects?.[index]?.marks.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item sm={12} md={3}>
            <Controller
              name={`subjects[${index}].attendance`}
              control={control}
              render={({ field }) => (
                <FormControl component="fieldset" margin="normal">
                  <RadioGroup 
                    {...field}
                    row
                    onChange={(e) => {
                      field.onChange(e);
                      handleAttendanceChange(index, e.target.value);
                    }}
                  >
                    <FormControlLabel value="Present" control={<Radio />} label="Present" />
                    <FormControlLabel value="Absent" control={<Radio />} label="Absent" />
                  </RadioGroup>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item sm={12} md={3}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ my: 2 }}
              onClick={() => remove(index)}
            >
              Remove Subject
            </Button>
          </Grid>
        </Grid>
      ))}
      <Grid container spacing={2} alignItems="center">
        <Grid item sm={12} md={6}>
          <TextField
            label="New Subject"
            variant="outlined"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item sm={12} md={4}>
          <Button
            sx={{ mb: 2 }}
            variant="contained"
            color="primary"
            onClick={handleAddSubject}
            disabled={!newSubject}
          >
            Add Subject
          </Button>
        </Grid>
      </Grid>
      <Button size='large' sx={{my:3}} type="submit" variant="contained" color="primary" >
        {loadingSubmit ? <CircularProgress size={24} /> : 'Submit'} {/* Show loader for submit */}
      </Button>
    </Container>
  );
};

export default ExamReportForm;


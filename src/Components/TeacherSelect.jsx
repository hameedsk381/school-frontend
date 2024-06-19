import React from 'react';
import { FormControl, InputLabel, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

const TeacherSelect = ({ teachers, selectedTeacher, handleTeacherChange }) => {
  return (
    <FormControl fullWidth sx={{ my: 2 }}>
      <InputLabel id="teacher-label">Teacher</InputLabel>
      <Autocomplete
        id="teacher-select"
        options={teachers}
        getOptionLabel={(teacher) => teacher.name}
        value={selectedTeacher}
        onChange={(event, newValue) => {
          handleTeacherChange(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Teacher"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </FormControl>
  );
};

export default TeacherSelect;

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button } from '@mui/material';
import styled from '@emotion/styled';
import REACT_API_URL from '../config';

const useStyles = styled((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function ResetPassword() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${REACT_API_URL}/users/reset-password`, {
        password,
        confirmPassword,
        resetToken: token,
      });
      // Display success message to user
      navigate('/login');
    } catch (error) {
      console.log(error.response.data);
      // Display error message to user
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Reset Password
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={classes.textField}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={classes.textField}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth className={classes.button}>
          Reset Password
        </Button>
      </form>
    </Container>
  );
}

export default ResetPassword;

import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import REACT_API_URL from "../config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [message, setMessage] = useState("");
  const steps = ["Enter Email", "Verify Token", "Reset Password"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setEmail("");
    setResetToken("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetTokenChange = (e) => {
    setResetToken(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${REACT_API_URL}/users/forgot-password`, { email });
      setMessage(res.data.message);
      handleNext();
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleVerifyTokenSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${REACT_API_URL}/users/verify-token`, { resetToken });
      setMessage(res.data.message);
      handleNext();
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(`${REACT_API_URL}/users/reset-password`, {
        resetToken,
        newPassword,
      });
      setMessage(res.data.message);
      handleNext();
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <Button variant="contained" color="primary" onClick={handleForgotPasswordSubmit}>
              Send Reset Token
            </Button>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <TextField
              variant="outlined"
              label="Reset Token"
              type="text"
              value={resetToken}
              onChange={handleResetTokenChange}
              required
            />
            <Button variant="contained" color="primary" onClick={handleVerifyTokenSubmit}>
              Verify Token
            </Button>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <TextField
            variant="outlined"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
          <TextField
            variant="outlined"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <Button variant="contained" color="primary" onClick={handleResetPasswordSubmit}>
            Reset Password
          </Button>
        </React.Fragment>
      );
      default:
        return "Unknown step";
    }
};

return (
<React.Fragment>
<Stepper activeStep={activeStep} alternativeLabel>
{steps.map((label) => (
<Step key={label}>
<StepLabel>{label}</StepLabel>
</Step>
))}
</Stepper>
<div>
{activeStep === steps.length ? (
<React.Fragment>
<Typography variant="h6">{message}</Typography>
<Button onClick={handleReset}>Reset</Button>
</React.Fragment>
) : (
<React.Fragment>
<Typography variant="h6">{getStepContent(activeStep)}</Typography>
<div>
<Button disabled={activeStep === 0} onClick={handleBack}>
Back
</Button>
<Button variant="contained" color="primary" onClick={handleNext}>
{activeStep === steps.length - 1 ? "Finish" : "Next"}
</Button>
</div>
</React.Fragment>
)}
</div>
</React.Fragment>
);
};

export default ForgotPassword;    
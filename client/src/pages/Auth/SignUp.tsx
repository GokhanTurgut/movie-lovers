import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../../components/Button/GoogleButton";
import FacebookButton from "../../components/Button/FacebookButton";
import axios from "axios";
import { emailChecker } from "../../utils/validation";

const SignUp = () => {
  let navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  function firstNameHandler(e: React.BaseSyntheticEvent) {
    setFirstName(e.target.value);
    if (e.target.value.length === 0) {
      setFirstNameError("Can't be empty!");
    } else {
      setFirstNameError("");
    }
  }

  function lastNameHandler(e: React.BaseSyntheticEvent) {
    setLastName(e.target.value);
    if (e.target.value.length === 0) {
      setLastNameError("Can't be empty!");
    } else {
      setLastNameError("");
    }
  }

  function emailHandler(e: React.BaseSyntheticEvent) {
    setEmail(e.target.value);
    if (!emailChecker(e.target.value)) {
      setEmailError("Please enter a valid email!");
    } else {
      setEmailError("");
    }
  }

  function passwordHandler(e: React.BaseSyntheticEvent) {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError("Must be at least 6 characters long!");
    } else {
      setPasswordError("");
    }
  }

  function confirmPasswordHandler(e: React.BaseSyntheticEvent) {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setConfirmPasswordError("Passwords does not match!");
    } else {
      setConfirmPasswordError("");
    }
  }

  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (
      !!firstNameError ||
      !!lastNameError ||
      !!emailError ||
      !!passwordError ||
      !!confirmPasswordError
    )
      return;
    if (!firstName || !lastName || !email || !password || !confirmPassword)
      return;
    try {
      const result = await axios.post("http://localhost:5000/auth/signup", {
        email,
        firstName,
        lastName,
        password,
      });
      if (result.status === 201) {
        navigate("/signin");
      }
    } catch (err: any) {
      if (err.response.data.message.includes("Email")) {
        setEmailError(err.response.data.message);
      }
    }
  }

  return (
    <div className="container">
      <h3 className="margin-zero">Sign up to Movie Lovers</h3>
      <form className="form-base" onSubmit={submitHandler}>
        <TextField
          id="firstName"
          label="First Name"
          variant="outlined"
          onChange={firstNameHandler}
          error={!!firstNameError}
          helperText={firstNameError}
        />
        <TextField
          id="lastName"
          label="Last Name"
          variant="outlined"
          onChange={lastNameHandler}
          error={!!lastNameError}
          helperText={lastNameError}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          onChange={emailHandler}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          onChange={passwordHandler}
          error={!!passwordError}
          helperText={passwordError}
        />
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          onChange={confirmPasswordHandler}
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      <h3 className="margin-zero">OR</h3>
      <GoogleButton />
      <FacebookButton />
    </div>
  );
};

export default SignUp;

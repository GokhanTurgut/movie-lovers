import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user";
import axios from "axios";
import classes from "./SignIn.module.css";
import GoogleButton from "../../components/button/GoogleButton";
import FacebookButton from "../../components/button/FacebookButton";
import { emailChecker } from "../../utils/validation";

const SignIn = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (!!emailError || !!passwordError) return;
    if (!email || !password) return;
    try {
      const result = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      const { token, userId } = result.data;
      if (result.status === 200) {
        dispatch(
          setUser({
            userId: userId as string,
            token: token as string,
          })
        );
        navigate("/");
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  return (
    <div className={classes.container}>
      <h2>Sign in to Movie Lovers</h2>
      <form className={classes.form} onSubmit={submitHandler}>
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
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      <h2>OR</h2>
      <GoogleButton />
      <FacebookButton />
    </div>
  );
};

export default SignIn;

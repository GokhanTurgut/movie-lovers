import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user";
import axios from "axios";
import GoogleButton from "../../components/Button/GoogleButton";
import FacebookButton from "../../components/Button/FacebookButton";
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
    if (!email) {
      setEmailError("Can't be empty!");
      return;
    }
    if (!password) {
      setPasswordError("Can't be empty!");
      return;
    }
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
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch (err: any) {
      if (err.response.data.message.includes("Email")) {
        setEmailError(err.response.data.message);
      }
      if (err.response.data.message.includes("password")) {
        setPasswordError(err.response.data.message);
      }
    }
  }

  return (
    <div className="container">
      <h3 className="margin-zero">Sign in to Movie Lovers</h3>
      <form className="form-base" onSubmit={submitHandler}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={emailHandler}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={passwordHandler}
          error={!!passwordError}
          helperText={passwordError}
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

export default SignIn;

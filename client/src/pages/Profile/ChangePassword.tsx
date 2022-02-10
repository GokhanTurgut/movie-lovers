import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../redux/store";

type Props = {};

const ChangePassword = (props: Props) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");
  const [message, setMessage] = useState(<></>);

  const user = useSelector((state: RootState) => state.user);
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };

  function passwordHandler(e: React.BaseSyntheticEvent) {
    setPassword(e.target.value);
  }

  function newPasswordHandler(e: React.BaseSyntheticEvent) {
    setNewPassword(e.target.value);
    if (e.target.value.length < 6) {
      setNewPasswordError("Must be at least 6 characters long!");
    } else {
      setNewPasswordError("");
    }
  }

  function confirmNewPasswordHandler(e: React.BaseSyntheticEvent) {
    setConfirmNewPassword(e.target.value);
    if (e.target.value !== newPassword) {
      setConfirmNewPasswordError("Passwords does not match!");
    } else {
      setConfirmNewPasswordError("");
    }
  }

  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (!!newPasswordError || !!confirmNewPasswordError) return;
    if (!newPassword) {
      setNewPasswordError("Can't be empty!");
      return;
    }
    if (!confirmNewPassword) {
      setConfirmNewPasswordError("Can't be empty!");
      return;
    }
    try {
      const result = await axios.put(
        "http://localhost:5000/user/password",
        {
          oldPassword: password,
          newPassword,
        },
        config
      );
      if (result.status === 200) {
        setMessage(
          <p className="success-message">
            <i className="fas fa-check-circle"></i> Password change successful!
          </p>
        );
      }
    } catch (err: any) {
      setMessage(
        <p className="error-message">
          <i className="fas fa-exclamation-circle"></i> Password change failed!
        </p>
      );
    }
  }

  return (
    <>
      <form className="form-base" onSubmit={submitHandler}>
        <TextField
          id="password"
          label="Old Password"
          variant="outlined"
          type="password"
          size="small"
          helperText={"Can be empty for first password!"}
          onChange={passwordHandler}
        />
        <TextField
          id="newPassword"
          label="New Password"
          variant="outlined"
          type="password"
          size="small"
          onChange={newPasswordHandler}
          error={!!newPasswordError}
          helperText={newPasswordError}
        />
        <TextField
          id="confirmNewPassword"
          label="Confirm New Password"
          variant="outlined"
          type="password"
          size="small"
          onChange={confirmNewPasswordHandler}
          error={!!confirmNewPasswordError}
          helperText={confirmNewPasswordError}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      {message}
    </>
  );
};

export default ChangePassword;

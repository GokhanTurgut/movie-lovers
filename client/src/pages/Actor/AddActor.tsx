import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { TextField, Button, FormControlLabel, Switch } from "@mui/material";
import styles from "./AddActor.module.css";
import { useNavigate } from "react-router-dom";

interface Props {};

const defaultObject = {
  firstName: "",
  lastName: "",
  imageURL: "",
  movies: "",
  public: true,
};

const AddActor = (props: Props) => {
  const [inputs, setInputs] = useState(defaultObject);
  const [errors, setErrors] = useState(defaultObject);
  const [message, setMessage] = useState(<></>);

  let navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };

  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (
      !!errors.firstName ||
      !!errors.lastName ||
      !!errors.imageURL ||
      !!errors.movies
    ) {
      return;
    }
    if (!inputs.firstName) {
      setErrors((state) => {
        return { ...state, firstName: "Can't be empty!" };
      });
      return;
    }
    if (!inputs.lastName) {
      setErrors((state) => {
        return { ...state, lastName: "Can't be empty!" };
      });
      return;
    }
    if (!inputs.imageURL) {
      setErrors((state) => {
        return { ...state, imageURL: "Can't be empty!" };
      });
      return;
    }
    if (!inputs.movies) {
      setErrors((state) => {
        return { ...state, movies: "Can't be empty!" };
      });
      return;
    }
    try {
      console.log(inputs);
      await axios.post("http://localhost:5000/actor", inputs, config);
      navigate("/");
    } catch (err) {
      setMessage(
        <p className="error-message">
          <i className="fas fa-exclamation-circle"></i> Actor creation failed!
        </p>
      );
    }
  }

  function firstNameHandler(e: React.BaseSyntheticEvent) {
    setInputs((state) => {
      return { ...state, firstName: e.target.value };
    });
    if (e.target.value.length === 0) {
      setErrors((state) => {
        return { ...state, firstName: "Can't be empty!" };
      });
    } else {
      setErrors((state) => {
        return { ...state, firstName: "" };
      });
    }
  }

  function lastNameHandler(e: React.BaseSyntheticEvent) {
    setInputs((state) => {
      return { ...state, lastName: e.target.value };
    });
    if (e.target.value.length === 0) {
      setErrors((state) => {
        return { ...state, lastName: "Can't be empty!" };
      });
    } else {
      setErrors((state) => {
        return { ...state, lastName: "" };
      });
    }
  }

  function imageURLHandler(e: React.BaseSyntheticEvent) {
    setInputs((state) => {
      return { ...state, imageURL: e.target.value };
    });
    if (e.target.value.length === 0) {
      setErrors((state) => {
        return { ...state, imageURL: "Can't be empty!" };
      });
    } else {
      setErrors((state) => {
        return { ...state, imageURL: "" };
      });
    }
  }

  function moviesHandler(e: React.BaseSyntheticEvent) {
    setInputs((state) => {
      return { ...state, movies: e.target.value };
    });
    if (e.target.value.length === 0) {
      setErrors((state) => {
        return { ...state, movies: "Can't be empty!" };
      });
    } else {
      setErrors((state) => {
        return { ...state, movies: "" };
      });
    }
  }

  function publicHandler(e: React.BaseSyntheticEvent) {
    setInputs((state) => {
      return { ...state, public: e.target.checked };
    });
  }

  return (
    <div className={styles.addActor + " container"}>
      <h2 className="margin-zero">Add Actor</h2>
      <form className="form-base" onSubmit={submitHandler}>
        <TextField
          id="firstName"
          label="First Name"
          variant="outlined"
          fullWidth
          onChange={firstNameHandler}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          id="lastName"
          label="Last Name"
          variant="outlined"
          fullWidth
          onChange={lastNameHandler}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          id="imageURL"
          label="Image URL"
          variant="outlined"
          fullWidth
          onChange={imageURLHandler}
          error={!!errors.imageURL}
          helperText={errors.imageURL}
        />
        <TextField
          id="movies"
          label="Movies"
          variant="outlined"
          multiline
          fullWidth
          onChange={moviesHandler}
          error={!!errors.movies}
          helperText={errors.movies}
        />
        <FormControlLabel
          label="Public"
          control={<Switch defaultChecked onChange={publicHandler} />}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      {message}
    </div>
  );
};

export default AddActor;

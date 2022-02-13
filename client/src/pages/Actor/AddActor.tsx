import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { TextField, Button, FormControlLabel, Switch } from "@mui/material";
import styles from "./AddActor.module.css";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  editing: boolean;
}

const defaultObject = {
  firstName: "",
  lastName: "",
  imageURL: "",
  movies: "",
  public: true,
};

const AddActor = (props: Props) => {
  const { id } = useParams();
  const [inputs, setInputs] = useState(defaultObject);
  const [errors, setErrors] = useState(defaultObject);
  const [message, setMessage] = useState(<></>);
  let navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);
  const config = useMemo(() => {
    return {
      headers: { Authorization: `Bearer ${user.token}` },
    };
  }, [user.token]);

  useEffect(() => {
    async function getActorData() {
      if (props.editing && id) {
        try {
          const result = await axios.get(
            `http://localhost:5000/actor/${id}`,
            config
          );
          console.log(result);
          setInputs({
            firstName: result.data.actor.firstName,
            lastName: result.data.actor.lastName,
            imageURL: result.data.actor.imageURL,
            movies: result.data.actor.movies,
            public: result.data.actor.public,
          });
        } catch (err) {
          setMessage(
            <p className="error-message">
              <i className="fas fa-exclamation-circle"></i> Getting actor data
              failed!
            </p>
          );
        }
      }
    }
    getActorData();
  }, [props.editing, id, config]);

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
    if (props.editing && id) {
      try {
        const result = await axios.put(
          `http://localhost:5000/actor/${id}`,
          inputs,
          config
        );
        navigate(`/actor/${result.data.actor.id}`);
      } catch (err) {
        setMessage(
          <p className="error-message">
            <i className="fas fa-exclamation-circle"></i> Actor update failed!
          </p>
        );
      }
    } else {
      try {
        const result = await axios.post(
          "http://localhost:5000/actor",
          inputs,
          config
        );
        navigate(`/actor/${result.data.actor.id}`);
      } catch (err) {
        setMessage(
          <p className="error-message">
            <i className="fas fa-exclamation-circle"></i> Actor creation failed!
          </p>
        );
      }
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
          value={inputs.firstName}
          onChange={firstNameHandler}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          id="lastName"
          label="Last Name"
          variant="outlined"
          fullWidth
          value={inputs.lastName}
          onChange={lastNameHandler}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          id="imageURL"
          label="Image URL"
          variant="outlined"
          fullWidth
          value={inputs.imageURL}
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
          value={inputs.movies}
          onChange={moviesHandler}
          error={!!errors.movies}
          helperText={errors.movies}
        />
        <FormControlLabel
          label="Public"
          control={<Switch onChange={publicHandler} checked={inputs.public} />}
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

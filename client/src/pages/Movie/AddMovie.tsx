import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { TextField, Button, FormControlLabel, Switch } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import styles from "./AddMovie.module.css";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  editing: boolean;
}

const defaultObject = {
  title: "",
  posterURL: "",
  genre: "",
  director: "",
  actors: "",
  plot: "",
  public: true,
};

const AddMovie = (props: Props) => {
  const { id } = useParams();
  const [inputs, setInputs] = useState(defaultObject);
  const [errors, setErrors] = useState(defaultObject);
  const [release, setRelease] = useState<Date | null>(null);
  const [releaseError, setReleaseError] = useState("");
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
            `http://localhost:5000/movie/${id}`,
            config
          );
          setInputs({
            title: result.data.movie.title,
            posterURL: result.data.movie.posterURL,
            genre: result.data.movie.genre,
            director: result.data.movie.director,
            actors: result.data.movie.actors,
            plot: result.data.movie.plot,
            public: result.data.movie.public,
          });
          setRelease(new Date(result.data.movie.release));
        } catch (err) {
          setMessage(
            <p className="error-message">
              <i className="fas fa-exclamation-circle"></i> Getting movie data
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
      !!errors.title ||
      !!errors.posterURL ||
      !!errors.genre ||
      !!errors.director
    ) {
      return;
    }
    if (!inputs.title) {
      setErrors((state) => {
        return { ...state, title: "Can't be empty!" };
      });
      return;
    }
    if (!inputs.posterURL) {
      setErrors((state) => {
        return { ...state, posterURL: "Can't be empty!" };
      });
      return;
    }
    if (!inputs.genre) {
      setErrors((state) => {
        return { ...state, genre: "Can't be empty!" };
      });
      return;
    }
    if (!inputs.director) {
      setErrors((state) => {
        return { ...state, director: "Can't be empty!" };
      });
      return;
    }
    if (!inputs.actors) {
      setErrors((state) => {
        return { ...state, actors: "Can't be empty!" };
      });
      return;
    }
    if (!inputs.plot) {
      setErrors((state) => {
        return { ...state, plot: "Can't be empty!" };
      });
      return;
    }
    if (!release) {
      setReleaseError("Can't be empty!");
      return;
    }
    if (props.editing && id) {
      try {
        const result = await axios.put(
          `http://localhost:5000/movie/${id}`,
          { ...inputs, release },
          config
        );
        navigate(`/movie/${result.data.movie.id}`);
      } catch (err) {
        setMessage(
          <p className="error-message">
            <i className="fas fa-exclamation-circle"></i> Movie update failed!
          </p>
        );
      }
    } else {
      try {
        const result = await axios.post(
          "http://localhost:5000/movie",
          { ...inputs, release },
          config
        );
        navigate(`/movie/${result.data.movie.id}`);
      } catch (err) {
        setMessage(
          <p className="error-message">
            <i className="fas fa-exclamation-circle"></i> Movie creation failed!
          </p>
        );
      }
    }
  }

  function titleHandler(e: React.BaseSyntheticEvent) {
    setInputs((state) => {
      return { ...state, title: e.target.value };
    });
    if (e.target.value.length === 0) {
      setErrors((state) => {
        return { ...state, title: "Can't be empty!" };
      });
    } else {
      setErrors((state) => {
        return { ...state, title: "" };
      });
    }
  }

  function posterURLHandler(e: React.BaseSyntheticEvent) {
    setInputs((state) => {
      return { ...state, posterURL: e.target.value };
    });
    if (e.target.value.length === 0) {
      setErrors((state) => {
        return { ...state, posterURL: "Can't be empty!" };
      });
    } else {
      setErrors((state) => {
        return { ...state, posterURL: "" };
      });
    }
  }

  function genreHandler(e: React.BaseSyntheticEvent) {
    setInputs((state) => {
      return { ...state, genre: e.target.value };
    });
    if (e.target.value.length === 0) {
      setErrors((state) => {
        return { ...state, genre: "Can't be empty!" };
      });
    } else {
      setErrors((state) => {
        return { ...state, genre: "" };
      });
    }
  }
  function directorHandler(e: React.BaseSyntheticEvent) {
    setInputs((state) => {
      return { ...state, director: e.target.value };
    });
    if (e.target.value.length === 0) {
      setErrors((state) => {
        return { ...state, director: "Can't be empty!" };
      });
    } else {
      setErrors((state) => {
        return { ...state, director: "" };
      });
    }
  }

  function actorsHandler(e: React.BaseSyntheticEvent) {
    setInputs((state) => {
      return { ...state, actors: e.target.value };
    });
    if (e.target.value.length === 0) {
      setErrors((state) => {
        return { ...state, actors: "Can't be empty!" };
      });
    } else {
      setErrors((state) => {
        return { ...state, actors: "" };
      });
    }
  }

  function plotHandler(e: React.BaseSyntheticEvent) {
    setInputs((state) => {
      return { ...state, plot: e.target.value };
    });
    if (e.target.value.length === 0) {
      setErrors((state) => {
        return { ...state, plot: "Can't be empty!" };
      });
    } else {
      setErrors((state) => {
        return { ...state, plot: "" };
      });
    }
  }

  function releaseHandler(newValue: Date | null) {
    setRelease(newValue);
  }

  function publicHandler(e: React.BaseSyntheticEvent) {
    setInputs((state) => {
      return { ...state, public: e.target.checked };
    });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={styles.addActor + " container"}>
        <h2 className="margin-zero">Add Movie</h2>
        <form className="form-base" onSubmit={submitHandler}>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            fullWidth
            value={inputs.title}
            onChange={titleHandler}
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            id="posterURL"
            label="Poster URL"
            variant="outlined"
            fullWidth
            value={inputs.posterURL}
            onChange={posterURLHandler}
            error={!!errors.posterURL}
            helperText={errors.posterURL}
          />
          <TextField
            id="genre"
            label="Genre(s)"
            variant="outlined"
            fullWidth
            value={inputs.genre}
            onChange={genreHandler}
            error={!!errors.genre}
            helperText={errors.genre}
          />
          <TextField
            id="director"
            label="Director"
            variant="outlined"
            fullWidth
            value={inputs.director}
            onChange={directorHandler}
            error={!!errors.director}
            helperText={errors.director}
          />
          <DatePicker
            label="Release Date"
            value={release}
            onChange={releaseHandler}
            renderInput={(params) => (
              <TextField
                fullWidth
                error={!!releaseError}
                helperText={releaseError}
                {...params}
              />
            )}
          />
          <TextField
            id="actors"
            label="Actors"
            variant="outlined"
            multiline
            fullWidth
            value={inputs.actors}
            onChange={actorsHandler}
            error={!!errors.actors}
            helperText={errors.actors}
          />
          <TextField
            id="plot"
            label="Plot"
            variant="outlined"
            multiline
            fullWidth
            value={inputs.plot}
            onChange={plotHandler}
            error={!!errors.plot}
            helperText={errors.plot}
          />
          <FormControlLabel
            label="Public"
            control={
              <Switch onChange={publicHandler} checked={inputs.public} />
            }
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
        {message}
      </div>
    </LocalizationProvider>
  );
};

export default AddMovie;

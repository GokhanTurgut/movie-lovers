import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import styles from "./AddComment.module.css";

interface Props {
  id: string | undefined;
  type: string;
  refresh: () => void;
}

const AddComment = (props: Props) => {
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState("");

  const user = useSelector((state: RootState) => state.user);
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };

  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();

    if (content.trim().length === 0) {
      setContentError("Can't be empty!");
      return;
    }
    let data;
    if (props.type === "movie") {
      data = {
        movieId: props.id,
        content,
      };
    } else if (props.type === "actor") {
      data = {
        actorId: props.id,
        content,
      };
    }
    if (!data) return;
    try {
      await axios.post(
        `http://localhost:5000/${props.type}/comment`,
        data,
        config
      );
      setContent("");
      props.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  function contentHandler(e: React.BaseSyntheticEvent) {
    setContent(e.target.value);
  }

  return (
    <form className={styles.form + " form-base"} onSubmit={submitHandler}>
      <TextField
        id="content"
        label="Comment"
        variant="outlined"
        minRows={2}
        multiline
        value={content}
        onChange={contentHandler}
        error={!!contentError}
        helperText={contentError}
      />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AddComment;

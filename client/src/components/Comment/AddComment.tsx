import { useState, useEffect, useMemo } from "react";
import { TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import styles from "./AddComment.module.css";

interface Props {
  id: string | undefined;
  commentId: string | undefined;
  type: string;
  editing: boolean;
  refresh: () => void;
}

const AddComment = (props: Props) => {
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState("");

  const user = useSelector((state: RootState) => state.user);
  const config = useMemo(() => {
    return {
      headers: { Authorization: `Bearer ${user.token}` },
    };
  }, [user.token]);

  useEffect(() => {
    async function getCommentData() {
      if (props.editing && props.commentId) {
        try {
          const result = await axios.get(
            `https://gusto-movie.herokuapp.com/${props.type}/comment/${props.commentId}`,
            config
          );
          setContent(result.data.comment.content);
        } catch (err) {
          console.error(err);
        }
      }
    }
    getCommentData();
  }, [props.editing, props.commentId, props.type, config]);

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
    if (props.editing && props.commentId) {
      try {
        const result = await axios.put(
          `https://gusto-movie.herokuapp.com/${props.type}/comment/${props.commentId}`,
          data,
          config
        );
        setContent(result.data.comment.content);
        props.refresh();
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await axios.post(
          `https://gusto-movie.herokuapp.com/${props.type}/comment`,
          data,
          config
        );
        setContent("");
        props.refresh();
      } catch (err) {
        console.error(err);
      }
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

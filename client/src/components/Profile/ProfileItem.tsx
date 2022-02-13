import { useState } from "react";
import { ButtonGroup, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AddComment from "../Comment/AddComment";
import styles from "./ProfileItem.module.css";

interface Props {
  title: string;
  id: string;
  type: string;
  refreshPage: () => void;
}

const ProfileCard = (props: Props) => {
  const [editComment, setEditComment] = useState(<></>);
  const [editing, setEditing] = useState(false);
  let navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };

  async function showHandler() {
    if (props.type === "movie" || props.type === "actor") {
      navigate(`/${props.type}/${props.id}`);
      return;
    }
    if (props.type === "movieComment") {
      try {
        const result = await axios.get(
          `https://gusto-movie.herokuapp.com/movie/comment/${props.id}`,
          config
        );
        navigate(`/movie/${result.data.comment.movieId}`);
        return;
      } catch (err) {
        console.error(err);
      }
    }
    if (props.type === "actorComment") {
      try {
        const result = await axios.get(
          `https://gusto-movie.herokuapp.com/actor/comment/${props.id}`,
          config
        );
        navigate(`/actor/${result.data.comment.actorId}`);
      } catch (err) {
        console.error(err);
      }
    }
  }

  async function editHandler() {
    if (props.type === "actor") {
      navigate(`/editActor/${props.id}`);
    }
    if (props.type === "movie") {
      navigate(`/editMovie/${props.id}`);
    }
    if (props.type === "movieComment") {
      if (editing) {
        setEditComment(<></>);
        setEditing(false);
      } else {
        try {
          const result = await axios.get(
            `https://gusto-movie.herokuapp.com/movie/comment/${props.id}`,
            config
          );
          setEditComment(
            <AddComment
              id={result.data.comment.movieId}
              type="movie"
              editing={true}
              commentId={props.id}
              refresh={props.refreshPage}
            />
          );
          setEditing(true);
        } catch (err) {
          console.error(err);
        }
      }
    }
    if (props.type === "actorComment") {
      if (editing) {
        setEditComment(<></>);
        setEditing(false);
      } else {
        try {
          const result = await axios.get(
            `https://gusto-movie.herokuapp.com/actor/comment/${props.id}`,
            config
          );
          setEditComment(
            <AddComment
              id={result.data.comment.actorId}
              type="actor"
              editing={true}
              commentId={props.id}
              refresh={props.refreshPage}
            />
          );
          setEditing(true);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  async function deleteHandler() {
    if (props.type === "movie" || props.type === "actor") {
      try {
        axios.delete(
          `https://gusto-movie.herokuapp.com/${props.type}/${props.id}`,
          config
        );
        props.refreshPage();
        return;
      } catch (err) {
        console.error(err);
      }
    }
    if (props.type === "movieComment") {
      try {
        axios.delete(
          `https://gusto-movie.herokuapp.com/movie/comment/${props.id}`,
          config
        );
        props.refreshPage();
        return;
      } catch (err) {
        console.error(err);
      }
    }
    if (props.type === "actorComment") {
      try {
        axios.delete(
          `https://gusto-movie.herokuapp.com/actor/comment/${props.id}`,
          config
        );
        props.refreshPage();
        return;
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.item}>
        <h4>{props.title}</h4>
        <ButtonGroup variant="contained" size="small" color="warning">
          <Button color="info" className={styles.btn} onClick={showHandler}>
            <i className="fas fa-eye"></i>View
          </Button>
          <Button color="warning" className={styles.btn} onClick={editHandler}>
            <i className="fas fa-edit"></i>Edit
          </Button>
          <Button color="error" className={styles.btn} onClick={deleteHandler}>
            <i className="fas fa-trash"></i>Delete
          </Button>
        </ButtonGroup>
      </div>
      {editing && <div className={styles.editComment}>{editComment}</div>}
    </div>
  );
};

export default ProfileCard;

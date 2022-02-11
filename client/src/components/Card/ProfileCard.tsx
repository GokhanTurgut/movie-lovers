import { ButtonGroup, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./ProfileCard.module.css";

interface Props {
  title: string;
  id: string;
  type: string;
  refreshPage: () => void;
}

const ProfileCard = (props: Props) => {
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
          `http://localhost:5000/movie/comment/${props.id}`,
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
          `http://localhost:5000/actor/comment/${props.id}`,
          config
        );
        navigate(`/actor/${result.data.comment.actorId}`);
      } catch (err) {
        console.error(err);
      }
    }
  }

  function editHandler() {
    if (props.type === "actor") {
      navigate(`/editActor/${props.id}`);
    }
    if (props.type === "movie") {
      navigate(`/editMovie/${props.id}`);
    }
  }

  async function deleteHandler() {
    if (props.type === "movie" || props.type === "actor") {
      try {
        axios.delete(`http://localhost:5000/${props.type}/${props.id}`, config);
        props.refreshPage();
        return;
      } catch (err) {
        console.error(err);
      }
    }
    if (props.type === "movieComment") {
      try {
        axios.delete(`http://localhost:5000/movie/comment/${props.id}`, config);
        props.refreshPage();
        return;
      } catch (err) {
        console.error(err);
      }
    }
    if (props.type === "actorComment") {
      try {
        axios.delete(`http://localhost:5000/actor/comment/${props.id}`, config);
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
    </div>
  );
};

export default ProfileCard;

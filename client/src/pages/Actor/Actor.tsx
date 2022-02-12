import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CircularProgress, Button, Alert } from "@mui/material";
import { ActorData } from "../../types/global";
import Comment from "../../components/Comment/Comment";
import AddComment from "../../components/Comment/AddComment";
import styles from "./Actor.module.css";

const Actor = () => {
  const { id } = useParams();
  const [actor, setActor] = useState<ActorData>();
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedbackAlert, setFeedbackAlert] = useState(<></>);
  const [showAddComment, setShowAddComment] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const user = useSelector((state: RootState) => state.user);
  const config = useMemo(() => {
    if (user.token) {
      return {
        headers: { Authorization: `Bearer ${user.token}` },
      };
    } else {
      return null;
    }
  }, [user.token]);

  useEffect(() => {
    async function getActor() {
      try {
        const result = await axios.get(
          `http://localhost:5000/public/actor/${id}`
        );
        setActor(result.data.actor);
        setAuthor(result.data.user);
        setLoading(false);
      } catch (err) {
        if (config) {
          const result = await axios.get(
            `http://localhost:5000/actor/${id}`,
            config
          );
          if (result.status === 200) {
            setActor(result.data.actor);
            setAuthor(result.data.user);
            setLoading(false);
            return;
          }
        }
        setError("Error occured with getting data!");
      }
    }
    getActor();
  }, [id, config, refresh]);

  if (error) {
    return <div className="container">{error}</div>;
  }

  if (loading) {
    return (
      <div className="container">
        <CircularProgress />
      </div>
    );
  }

  let comments: any = [];
  if (actor) {
    comments = actor.comments?.map((comment) => {
      return (
        <Comment
          key={comment.id}
          author={comment.author}
          content={comment.content}
          createdAt={comment.createdAt}
        />
      );
    });
  }

  async function likeHandler() {
    if (!user.token || !user.userId) {
      setFeedbackAlert(
        <Alert variant="filled" severity="error" onClose={closeFeedbackHandler}>
          Sing in to be able to like!
        </Alert>
      );
      return;
    }
    try {
      if (config) {
        const result = await axios.post(
          `http://localhost:5000/actor/like/${actor?.id}`,
          {},
          config
        );
        setActor((state) => {
          if (state) {
            return { ...state, likes: result.data.actor.likes };
          }
        });
      }
    } catch (err) {
      setFeedbackAlert(
        <Alert variant="filled" severity="error" onClose={closeFeedbackHandler}>
          Liking action failed!
        </Alert>
      );
    }
  }

  function addCommentHandler() {
    if (!user.token || !user.userId) {
      setFeedbackAlert(
        <Alert variant="filled" severity="error" onClose={closeFeedbackHandler}>
          Sing in to be able to comment!
        </Alert>
      );
      return;
    }
    setShowAddComment((state) => {
      return !state;
    });
  }

  function closeFeedbackHandler() {
    setFeedbackAlert(<></>);
  }

  function pageRefresh() {
    setRefresh((state) => {
      return !state;
    });
  }

  return (
    <div className="container">
      <div className={styles.actor}>
        <div className={styles.imageContainer}>
          <img
            src={actor?.imageURL}
            alt={actor?.firstName + " " + actor?.lastName}
          />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.infoElement}>
            <h4 className={styles.categoryName}>Actor:</h4>
            <h4>{`${actor?.firstName} ${actor?.lastName}`}</h4>
          </div>
          <div className={styles.infoElement}>
            <h4 className={styles.categoryName}>Movies:</h4>
            <h4>{actor?.movies}</h4>
          </div>
          <div className={styles.infoElement}>
            <h4 className={styles.categoryName}>Author:</h4>
            <h4>{author}</h4>
          </div>
          <div className={styles.infoElement}>
            <h4 className={styles.categoryName}>Likes:</h4>
            <h4>{actor?.likes.length}</h4>
          </div>
          <Button
            variant="contained"
            color="secondary"
            className={styles.btn}
            onClick={likeHandler}
          >
            <i className="fas fa-thumbs-up"></i>
            <h4>Like</h4>
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={styles.btn}
            onClick={addCommentHandler}
          >
            <i className="fas fa-comment-alt"></i>
            <h4>Comment</h4>
          </Button>
        </div>
      </div>
      {feedbackAlert}
      {showAddComment ? (
        <AddComment
          id={actor?.id}
          type="actor"
          refresh={pageRefresh}
          editing={false}
          commentId={undefined}
        />
      ) : (
        ""
      )}
      <div className={styles.comments}>
        <h3>Comments</h3>
        {comments}
      </div>
    </div>
  );
};

export default Actor;

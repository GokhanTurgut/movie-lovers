import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CircularProgress, Button, Alert } from "@mui/material";
import { MovieData } from "../../types/global";
import Comment from "../../components/Comment/Comment";
import AddComment from "../../components/Comment/AddComment";
import styles from "./Movie.module.css";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieData>();
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
    async function getMovie() {
      try {
        const result = await axios.get(
          `http://localhost:5000/public/movie/${id}`
        );
        setMovie(result.data.movie);
        setAuthor(result.data.user);
        setLoading(false);
      } catch (err) {
        if (config) {
          const result = await axios.get(
            `http://localhost:5000/movie/${id}`,
            config
          );
          if (result.status === 200) {
            setMovie(result.data.movie);
            setAuthor(result.data.user);
            setLoading(false);
            return;
          }
        }
        setError("Error occured with getting data!");
      }
    }
    getMovie();
  }, [id, refresh, config]);

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
  if (movie) {
    comments = movie.comments?.map((comment) => {
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
          `http://localhost:5000/movie/like/${movie?.id}`,
          {},
          config
        );
        setMovie((state) => {
          if (state) {
            return { ...state, likes: result.data.movie.likes };
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
      <div className={styles.movie}>
        <div className={styles.imageContainer}>
          <img src={movie?.posterURL} alt={movie?.title} />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.infoElement}>
            <h4 className={styles.categoryName}>Movie:</h4>
            <h4>{movie?.title}</h4>
          </div>
          <div className={styles.infoElement}>
            <h4 className={styles.categoryName}>Genre(s):</h4>
            <h4>{movie?.genre}</h4>
          </div>
          <div className={styles.infoElement}>
            <h4 className={styles.categoryName}>Release Date:</h4>
            <h4>{new Date(movie?.release as string).toLocaleDateString()}</h4>
          </div>
          <div className={styles.infoElement}>
            <h4 className={styles.categoryName}>Director:</h4>
            <h4>{movie?.director}</h4>
          </div>
          <div className={styles.infoElement}>
            <h4 className={styles.categoryName}>Actors:</h4>
            <h4>{movie?.actors}</h4>
          </div>
          <div className={styles.infoElement}>
            <h4 className={styles.categoryName}>Plot:</h4>
            <h4>{movie?.plot}</h4>
          </div>
          <div className={styles.infoElement}>
            <h4 className={styles.categoryName}>Author:</h4>
            <h4>{author}</h4>
          </div>
          <div className={styles.infoElement}>
            <h4 className={styles.categoryName}>Likes:</h4>
            <h4>{movie?.likes}</h4>
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
          id={movie?.id}
          type="movie"
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

export default Movie;

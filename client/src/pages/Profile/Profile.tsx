import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, CircularProgress } from "@mui/material";
import { RootState } from "../../redux/store";
import ChangePassword from "../../components/Password/ChangePassword";
import { UserData } from "../../types/global";
import ProfileCard from "../../components/Card/ProfileCard";
import styles from "./Profile.module.css";

const Profile = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [userData, setUserData] = useState<UserData>();
  const [refresh, setRefresh] = useState(false);

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    async function getUserData() {
      try {
        const result = await axios.get("http://localhost:5000/user", config);
        if (result.status === 200) {
          setUserData(result.data.user);
        }
      } catch (err: any) {
        console.error(err);
      }
    }
    getUserData();
  }, [user.token, refresh]);

  function showHandler() {
    setShowPasswordForm((state) => {
      return !state;
    });
  }

  function refreshHandler() {
    setRefresh((state) => {
      return !state;
    });
  }

  let passwordForm = null;
  if (showPasswordForm) {
    passwordForm = <ChangePassword />;
  }

  if (!userData) {
    return (
      <div className="container">
        <CircularProgress />
      </div>
    );
  }

  let myMovies;
  let myActors;
  let myMovieComments;
  let myActorComments;
  if (userData) {
    myMovies = userData.movies.map((movie) => {
      return (
        <ProfileCard
          key={movie.id}
          title={movie.title}
          id={movie.id}
          type="movie"
          refreshPage={refreshHandler}
        />
      );
    });
    myActors = userData.actors.map((actor) => {
      return (
        <ProfileCard
          key={actor.id}
          title={`${actor.firstName} ${actor.lastName}`}
          id={actor.id}
          type="actor"
          refreshPage={refreshHandler}
        />
      );
    });
    myMovieComments = userData.movieComments.map((comment) => {
      const content =
        comment.content.length > 14
          ? `${comment.content.slice(0, 15)}...`
          : comment.content.slice(0, 15);
      return (
        <ProfileCard
          key={comment.id}
          title={content}
          id={comment.id}
          type="movieComment"
          refreshPage={refreshHandler}
        />
      );
    });
    myActorComments = userData.actorComments.map((comment) => {
      const content =
        comment.content.length > 14
          ? `${comment.content.slice(0, 15)}...`
          : comment.content.slice(0, 15);
      return (
        <ProfileCard
          key={comment.id}
          title={content}
          id={comment.id}
          type="actorComment"
          refreshPage={refreshHandler}
        />
      );
    });
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.profile + " container"}>
        <div className={styles.profileInfo}>
          <h3>Profile Information</h3>
          <div className={styles.profileElement}>
            <h4 className={styles.categoryName}>First Name:</h4>
            <h4>{userData ? userData.firstName : ""}</h4>
          </div>
          <div className={styles.profileElement}>
            <h4 className={styles.categoryName}>Last Name:</h4>
            <h4>{userData ? userData.lastName : ""}</h4>
          </div>
          <div className={styles.profileElement}>
            <h4 className={styles.categoryName}>Email:</h4>
            <h4>{userData ? userData.email : ""}</h4>
          </div>
        </div>
        <div className={styles.password}>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={showHandler}
          >
            {showPasswordForm ? "Cancel" : "Change Password"}
          </Button>
          {passwordForm}
        </div>
      </div>
      <div className={styles.userContent + " container"}>
        <h3>My Movies</h3>
        {myMovies}
      </div>
      <div className={styles.userContent + " container"}>
        <h3>My Actors</h3>
        {myActors}
      </div>
      <div className={styles.userContent + " container"}>
        <h3>My Comments</h3>
        {myMovieComments}
        {myActorComments}
      </div>
    </div>
  );
};

export default Profile;
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import HomeCard from "../components/Card/HomeCard";
import styles from "./Home.module.css";
import { MovieData, ActorData } from "../types/global";

const Home = () => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [actors, setActors] = useState<ActorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMovies() {
      try {
        const result = await axios.get("http://localhost:5000/public/movie");
        setMovies(result.data.movies);
        setLoading(false);
      } catch (err) {
        setError("Error occured with getting data!");
      }
    }
    async function getActors() {
      try {
        const result = await axios.get("http://localhost:5000/public/actor");
        setActors(result.data.actors);
        setLoading(false);
      } catch (err) {
        setError("Error occured with getting data!");
      }
    }
    getMovies();
    getActors();
  }, []);
  const movieCards = movies.map((movie) => {
    return (
      <HomeCard
        key={movie.id}
        id={movie.id}
        imageURL={movie.posterURL}
        title={movie.title}
        type="movie"
      />
    );
  });

  const actorCards = actors.map((actor) => {
    return (
      <HomeCard
        key={actor.id}
        id={actor.id}
        imageURL={actor.imageURL}
        title={actor.firstName + " " + actor.lastName}
        type="actor"
      />
    );
  });

  const muchMovies = [];

  for (let i = 0; i < 20; i++) {
    muchMovies.push(movieCards[0]);
  }

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

  return (
    <div className={styles.home}>
      {movieCards}
      {actorCards}
    </div>
  );
};

export default Home;

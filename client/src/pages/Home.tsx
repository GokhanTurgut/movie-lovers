import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import HomeCard from "../components/UI/HomeCard";
import styles from "./Home.module.css";
import { Movie, Actor } from "../types/global";

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMovies() {
      try {
        const result = await axios.get("http://localhost:5000/public/movie");
        console.log(result);
        setMovies(result.data.movies);
        setLoading(false);
      } catch (err) {
        setError("Error occured with getting data!");
      }
    }
    async function getActors() {
      try {
        const result = await axios.get("http://localhost:5000/public/actor");
        console.log(result);
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
      <HomeCard key={movie.id} imageURL={movie.posterURL} title={movie.title} />
    );
  });

  const actorCards = actors.map((actor) => {
    return (
      <HomeCard
        key={actor.id}
        imageURL={actor.imageURL}
        title={actor.firstName + " " + actor.lastName}
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

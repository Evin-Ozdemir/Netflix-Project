import { useEffect, useState } from "react";
import api from "../../utils/api";
import Hero from "./hero";
import Error from "../../components/error";
import Loader from "../../components/loader";
import MovieList from "./movie-list";

const Home = () => {
  const [genres, setGenres] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/genre/movie/list?language=tr")
      .then((res) => setGenres(res.data.genres))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <Hero />
      {error ? (
        <Error info={error} />
      ) : !genres ? (
        <Loader />
      ) : (
        genres.map((genre) => <MovieList key={genre.id} genre={genre} />)
      )}
    </div>
  );
};

export default Home;

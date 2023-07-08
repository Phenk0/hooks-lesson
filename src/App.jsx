import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Box from "./components/UI/Box";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import MoviesList from "./components/MoviesList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedList from "./components/WatchedList";
import Loader from "./components/UI/Loader";
import ErrorMessage from "./components/UI/ErrorMessage";
import MovieDetails from "./components/MovieDetails";

export const OMDBAPI_KEY = "fbb9ffba";
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const currentMovieUserRating =
    watched.find(({ imdbID }) => imdbID === selectedId)?.userRating || 0;

  const handleSelectMovie = (movieId) =>
    setSelectedId((prevID) => (prevID === movieId ? null : movieId));
  const handleCloseMovieDetails = () => setSelectedId(null);

  const handleAddWatched = (movie) =>
    setWatched((watched) =>
      watched.find(({ imdbID }) => imdbID === movie.imdbID)
        ? watched.map((prevMovie) =>
            prevMovie.imdbID === movie.imdbID ? movie : prevMovie
          )
        : [...watched, movie]
    );
  const handleRemoveWatchedMovie = (id) =>
    setWatched((prevWatched) => [
      ...prevWatched.filter(({ imdbID }) => imdbID !== id),
    ]);

  useEffect(() => {
    //prevent overlapping and crashes fetches: INIT
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${OMDBAPI_KEY}&s=${query}&type=movie`,

          //prevent overlapping and crashes fetches: SET
          { signal: controller.signal }
        );
        if (!response.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await response.json();

        if (data.Error) throw new Error(data.Error);

        setMovies(data.Search);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    handleCloseMovieDetails();
    fetchMovies();
    return () => {
      setMovies([]);
      setError("");

      //prevent overlapping and crashes fetches: STOP older requests
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <NavBar>
        <Search onSetQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {Boolean(query) && !isLoading && error && (
            <ErrorMessage message={error} />
          )}
        </Box>

        <Box>
          {Boolean(selectedId) ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseDetails={handleCloseMovieDetails}
              onAddWatched={handleAddWatched}
              currentRating={currentMovieUserRating}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onRemoveWatchedMovie={handleRemoveWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

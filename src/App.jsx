import { useCallback, useState } from "react";
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
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

export const OMDBAPI_KEY = "fbb9ffba";
export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  const currentMovieUserRating =
    watched.find(({ imdbID }) => imdbID === selectedId)?.userRating || 0;

  const handleSelectMovie = (movieId) =>
    setSelectedId((prevID) => (prevID === movieId ? null : movieId));

  const handleCloseMovieDetails = useCallback(() => setSelectedId(null), []);

  const handleAddWatched = (movie) => {
    setWatched((prevWatched) =>
      prevWatched.find(({ imdbID }) => imdbID === movie.imdbID)
        ? prevWatched.map((prevMovie) =>
            prevMovie.imdbID === movie.imdbID ? movie : prevMovie
          )
        : [...prevWatched, movie]
    );
  };

  const handleRemoveWatchedMovie = (id) =>
    setWatched((prevWatched) => [
      ...prevWatched.filter(({ imdbID }) => imdbID !== id),
    ]);

  const { movies, isLoading, error } = useMovies(
    query,
    handleCloseMovieDetails
  );
  return (
    <>
      <NavBar>
        <Search onSetQuery={setQuery} query={query} />
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

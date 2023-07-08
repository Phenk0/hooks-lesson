import { useEffect, useState } from "react";
import { OMDBAPI_KEY } from "../App";
import Loader from "./UI/Loader";
import ErrorMessage from "./UI/ErrorMessage";
import StarRating from "./UI/StarRating";

const MovieDetails = ({
  selectedId,
  onCloseDetails,
  onAddWatched,
  currentRating,
}) => {
  const [movieInfo, setMovieInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(0);
  const {
    title,
    plot,
    poster,
    runtime,
    imdbRating,
    released,
    actors,
    director,
    genre,
  } = movieInfo;

  const handleUserRating = (rating) => setUserRating(rating);

  const handleAdd = () => {
    if (!userRating) {
      alert("Add your personal rating please!");
      return;
    }
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      poster,
      runtime: parseFloat(runtime) || 0,
      imdbRating: Number(imdbRating) || 0,
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseDetails();
  };
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${OMDBAPI_KEY}&i=${selectedId}&type=movie`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        if (data.Error) {
          throw new Error(data.Error);
        }
        const {
          Title,
          Plot,
          Poster,
          Runtime,
          imdbRating,
          Released,
          Actors,
          Director,
          Genre,
        } = data;

        const modifiedMovieInfo = {
          title: Title,
          plot: Plot,
          poster: Poster,
          runtime: Runtime,
          imdbRating,
          released: Released,
          actors: Actors,
          director: Director,
          genre: Genre,
        };
        setMovieInfo(modifiedMovieInfo);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
    return () => {
      setMovieInfo({});
      setError("");
      setUserRating(0);
    };
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = "Movie | " + title;
    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") onCloseDetails();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCloseDetails]);

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && !error && Boolean(movieInfo) && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseDetails}>
              ⬅
            </button>
            <img src={poster} alt={title + " poster"} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐ {imdbRating} IMDB rating</span>
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {Boolean(currentRating) ? (
                `You already rated this movie: ${currentRating} ⭐`
              ) : (
                <StarRating
                  maxRating={10}
                  size={24}
                  defaultRating={currentRating}
                  onSetRating={handleUserRating}
                />
              )}
              {Boolean(userRating) && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to list
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {!isLoading && error && <ErrorMessage message={error} />}
    </div>
  );
};

export default MovieDetails;

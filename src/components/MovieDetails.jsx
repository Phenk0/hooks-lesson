import { useEffect, useRef, useState } from "react";
import { useKey } from "../hooks/useKey";

import Loader from "./UI/Loader";
import ErrorMessage from "./UI/ErrorMessage";
import StarRating from "./UI/StarRating";
import { useDetails } from "../hooks/useDetails";

const MovieDetails = ({
  selectedId,
  onCloseDetails,
  onAddWatched,
  currentRating,
}) => {
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);

  const { movieInfo, isLoading, error } = useDetails(selectedId, setUserRating);
  useEffect(() => {
    if (userRating) countRef.current += 1;
  }, [userRating]);

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
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseDetails();
  };

  useKey("Escape", onCloseDetails);

  useEffect(() => {
    if (!title) return;
    document.title = "Movie | " + title;
    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

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

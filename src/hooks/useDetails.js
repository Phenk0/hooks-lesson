import { useEffect, useState } from "react";
import { OMDBAPI_KEY } from "../App";

export const useDetails = (selectedId, setUserRating) => {
  const [movieInfo, setMovieInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
  }, [selectedId, setUserRating]);
  return { movieInfo, isLoading, error };
};

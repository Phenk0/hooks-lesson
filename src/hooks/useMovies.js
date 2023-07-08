import { useEffect, useState } from "react";
import { OMDBAPI_KEY } from "../App";

export const useMovies = (query, callback) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    callback?.();
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
    fetchMovies();
    return () => {
      setMovies([]);
      setError("");

      //prevent overlapping and crashes fetches: STOP older requests
      controller.abort();
    };
  }, [query, callback]);
  return { movies, isLoading, error };
};

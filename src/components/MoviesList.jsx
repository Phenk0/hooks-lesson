import MoviesListItem from "./MoviesListItem";

const MoviesList = ({ movies }) => {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <MoviesListItem movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};

export default MoviesList;

import WatchedItem from "./WatchedItem";

const WatchedList = ({ watched, onRemoveWatchedMovie }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedItem
          movie={movie}
          key={movie.imdbID}
          onRemoveWatchedMovie={onRemoveWatchedMovie}
        />
      ))}
    </ul>
  );
};

export default WatchedList;

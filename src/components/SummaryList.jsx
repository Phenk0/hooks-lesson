import SummaryItem from "./SummaryItem";

const SummaryList = ({ watched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <SummaryItem movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};

export default SummaryList;

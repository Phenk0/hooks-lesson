import { useState } from "react";
import SummaryHeader from "./SummaryHeader";
import SummaryList from "./SummaryList";
import BtnToggle from "./BtnToggle";

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const SummaryBox = () => {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  const openHandler = () => setIsOpen2((open) => !open);
  return (
    <div className="box">
      <BtnToggle onOpen={openHandler} isOpen={isOpen2} />
      {isOpen2 && (
        <>
          <SummaryHeader watched={watched} />

          <SummaryList watched={watched} />
        </>
      )}
    </div>
  );
};

export default SummaryBox;

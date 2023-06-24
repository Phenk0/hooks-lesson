import { useState } from "react";
import BtnToggle from "./BtnToggle";
import MoviesList from "./MoviesList";

const MoviesBox = ({ movies }) => {
  const [isOpen1, setIsOpen1] = useState(true);
  const openHandler = () => setIsOpen1((open) => !open);
  return (
    <div className="box">
      <BtnToggle isOpen={isOpen1} onOpen={openHandler} />
      {isOpen1 && <MoviesList movies={movies} />}
    </div>
  );
};

export default MoviesBox;

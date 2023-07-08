import { useRef } from "react";
import { useKey } from "../hooks/useKey";

const Search = ({ query, onSetQuery }) => {
  const inputRef = useRef(null);
  const handleSearchChange = () => onSetQuery(inputRef.current?.value);

  useKey("Enter", () => {
    if (inputRef.current === document.activeElement) return;
    inputRef.current.focus();
    onSetQuery("");
  });

  return (
    <input
      className="search"
      name="search"
      ref={inputRef}
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={handleSearchChange}
    />
  );
};

export default Search;

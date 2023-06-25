import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./components/UI/StarRating";
import { average } from "./utils/average";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/*<App />*/}
    <Test />
    <StarRating
      maxRating={10}
      color="#f0f"
      size={44}
      clasName="test"
      defaultRating={3}
    />

    <StarRating messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]} />
  </React.StrictMode>
);

function Test() {
  const [movieRating, setMovieRating] = useState([]);
  const setMovieRatingHandler = (newRating) =>
    setMovieRating((rating) => [...rating, newRating]);

  const averageMovieRating = average(movieRating).toFixed(1);
  return (
    <>
      <StarRating
        color="blue"
        maxRating={10}
        onSetRating={setMovieRatingHandler}
      />
      <p>
        {averageMovieRating > 0 ? "rating: " + averageMovieRating : "no rating"}
      </p>
    </>
  );
}

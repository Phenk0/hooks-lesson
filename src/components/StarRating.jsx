import Star from "./Star";
import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};
const starContainerStyle = {
  display: "flex",
  // gap: "4px",
};
const textStyle = {
  lineHeight: "1",
  margin: "0",
};
const StarRating = ({ maxRating = 5 }) => {
  const [rating, setRating] = useState(0);
  const [temporaryRating, setTemporaryRating] = useState(0);

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            isFull={temporaryRating ? temporaryRating > i : rating > i}
            onRate={() => setRating(i + 1)}
            onHoverIn={() => setTemporaryRating(i + 1)}
            onHoverOut={() => setTemporaryRating(0)}
          />
        ))}
      </div>
      <p style={textStyle}>{temporaryRating || rating || ""}</p>
    </div>
  );
};

export default StarRating;

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
const StarRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [temporaryRating, setTemporaryRating] = useState(0);
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    fontSize: size / 1.5 + "px",
    color,
  };
  const handleRate = (rating) => {
    setRating(rating);
    if (onSetRating) onSetRating(rating);
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            isFull={temporaryRating ? temporaryRating > i : rating > i}
            onRate={() => handleRate(i + 1)}
            onHoverIn={() => setTemporaryRating(i + 1)}
            onHoverOut={() => setTemporaryRating(0)}
            size={size}
            color={color}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[temporaryRating - 1] || messages[rating - 1] || ""
          : temporaryRating || rating || ""}
      </p>
    </div>
  );
};

export default StarRating;

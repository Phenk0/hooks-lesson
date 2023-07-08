import { useEffect } from "react";

export const useKey = (key, action) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code.toLowerCase() === key.toLowerCase()) action();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [action, key]);
};

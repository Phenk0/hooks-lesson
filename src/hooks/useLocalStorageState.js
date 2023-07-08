import { useEffect, useState } from "react";

export const useLocalStorageState = (initialState, keyWord) => {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(keyWord)) || initialState
  );

  useEffect(() => {
    localStorage.setItem(keyWord, JSON.stringify(value));
  }, [keyWord, value]);

  return [value, setValue];
};

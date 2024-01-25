// Archivo: useEscapeKey.js
import { useEffect, useState } from "react";

const useEscapeKey = () => {
  const [isEscapeKeyPressed, setIsEscapeKeyPressed] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsEscapeKeyPressed(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsEscapeKeyPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return isEscapeKeyPressed;
};

export default useEscapeKey;

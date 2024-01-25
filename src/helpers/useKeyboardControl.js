import { useState, useEffect } from "react";

const useKeyboardControl = () => {
  const [isKeyboardEnabled, setIsKeyboardEnabled] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isKeyboardEnabled) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isKeyboardEnabled]);

  const enableKeyboard = () => {
    setIsKeyboardEnabled(true);
  };

  const disableKeyboard = () => {
    setIsKeyboardEnabled(false);
  };

  return { isKeyboardEnabled, enableKeyboard, disableKeyboard };
};

export default useKeyboardControl;

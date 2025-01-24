import { useEffect, useState } from "react";

const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("");

  const handleScroll = () => {
    setScrollY(window.scrollY); // Capture the current scroll position

    // Determine scroll direction
    if (window.scrollY > prevScrollY) {
      setScrollDirection("down"); // Scrolling down
    } else if (window.scrollY < prevScrollY) {
      setScrollDirection("up"); // Scrolling up
    }

    // Update previous scroll position
    setPrevScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Add scroll event listener

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up on unmount
    };
  }, [prevScrollY]);

  return { scrollY, scrollDirection };
};

export default useScroll;

import { useEffect, useState } from "react";

const useMediaLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMedia = () => {
      const images = document.querySelectorAll("img");
      const videos = document.querySelectorAll("video");
      let loadedItems = 0;
      const totalItems = images.length + videos.length;

      const handleLoad = () => {
        loadedItems++;
        if (loadedItems === totalItems) {
          setIsLoading(false);
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          handleLoad();
        } else {
          img.addEventListener("load", handleLoad);
          img.addEventListener("error", handleLoad);
        }
      });

      videos.forEach((video) => {
        if (video.readyState >= 3) {
          handleLoad();
        } else {
          video.addEventListener("canplay", handleLoad);
          video.addEventListener("error", handleLoad);
        }
      });

      if (totalItems === 0) {
        setIsLoading(false);
      }
    };

    setTimeout(loadMedia, 100);
  }, []);

  return isLoading;
};

export default useMediaLoader;

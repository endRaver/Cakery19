import { useState } from "react";
import ReactPlayer from "react-player";
import video from "../../../assets/videos/broll-480.mov";
import { play } from "@/assets/icons";

const VideoBanner = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [pauseTimeout, setPauseTimeout] = useState<NodeJS.Timeout | null>(null);

  const handlePause = () => {
    // Clear any existing timeout
    if (pauseTimeout) {
      clearTimeout(pauseTimeout);
    }
    // Set a new timeout to set isPlaying to false after 2 seconds
    const timeout = setTimeout(() => {
      setIsPlaying(false);
    }, 400);

    setPauseTimeout(timeout);
  };

  const handlePlay = () => {
    // Clear the timeout when playing
    if (pauseTimeout) {
      clearTimeout(pauseTimeout);
    }
    setIsPlaying(true);
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className={`absolute left-0 z-10 flex h-full w-full items-center justify-center bg-black/30 duration-700 ${isPlaying ? "top-full" : "top-0"}`}
      >
        <button
          className="flex size-28 select-none items-center justify-center rounded-full border bg-black/40 duration-300 hover:scale-110"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <img src={play} alt="play_icon" className="w-[32px]" />
        </button>
      </div>

      <ReactPlayer
        loop
        url={video}
        width="100%"
        height="100%"
        playing={isPlaying}
        controls={isPlaying}
        onPause={handlePause} // Call handlePause when paused
        onPlay={handlePlay}
      />
    </div>
  );
};

export default VideoBanner;

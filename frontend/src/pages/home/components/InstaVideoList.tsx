import { useState } from "react";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import ReactPlayer from "react-player";
import { play } from "@/assets/icons";

import videos from "../../../assets/videos";

const InstaVideoList = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  return (
    <div className="w-full">
      <Carousel
        opts={{
          dragFree: true,
          loop: false,
        }}
      >
        <CarouselContent>
          {videos.map((v, index) => (
            <CarouselItem key={index} className="basis-1/ md:basis-1/3 lg:basis-1/4">
              <a href={v.url} target="_blank" rel="noopener noreferrer">
                <div
                  className="relative"
                  onMouseOver={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <div
                    className={`absolute inset-0 flex h-full w-full items-center justify-center bg-gray-800 bg-cover bg-center bg-no-repeat duration-300 ${isHovered !== index ? "" : "opacity-0"}`}
                    style={{ backgroundImage: `url(${v.image})`, zIndex: 10 }}
                  >
                    <button className="flex size-10 select-none items-center justify-center bg-black/50">
                      <img src={play} alt="play_icon" />
                    </button>
                  </div>

                  <ReactPlayer
                    url={`${v.video}`}
                    width="100%"
                    height="100%"
                    playing={isHovered === index}
                    controls={false}
                    loop
                    muted
                  />
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default InstaVideoList;

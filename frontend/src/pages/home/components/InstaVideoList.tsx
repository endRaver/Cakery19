import { useState } from "react";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import ReactPlayer from "react-player";
import { play } from "@/assets/icons";

import videos from "../../../assets/videos";
import useWindowWidth from "@/hooks/useWindowWidth";

const InstaVideoList = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const windowWidth = useWindowWidth();

  return (
    <div className="w-full">
      <Carousel
        opts={{
          dragFree: true,
          loop: false,
        }}
      >
        <CarouselContent className="ml-0 gap-4">
          {videos.map((v, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 basis-auto select-none pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <a href={v.url} target="_blank" rel="noopener noreferrer">
                <div
                  className="relative"
                  onMouseOver={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <div
                    className={`absolute inset-0 flex h-[383px] w-[220px] items-center justify-center bg-gray-800 bg-cover bg-center bg-no-repeat duration-300 sm:h-full sm:w-full ${isHovered !== index ? "" : "opacity-0"}`}
                    style={{ backgroundImage: `url(${v.image})`, zIndex: 10 }}
                  >
                    <button className="flex size-10 select-none items-center justify-center bg-black/50">
                      <img src={play} alt="play_icon" />
                    </button>
                  </div>

                  <ReactPlayer
                    url={`${v.video}`}
                    width={windowWidth > 640 ? `100%` : `220px`}
                    height={windowWidth > 640 ? `100%` : `383px`}
                    playing={isHovered === index || windowWidth <= 640}
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

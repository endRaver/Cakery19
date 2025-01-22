import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Carousel } from "@/components/ui/carousel";
import { useState } from "react";
import ReactPlayer from "react-player";

import videos from "../../../assets/videos";
import { play } from "@/assets/icons";

console.log(videos);

const VideoSection = () => {
  const [isHovered, setIsHovered] = useState<number | null>(1);

  return (
    <section className="container mx-auto space-y-10">
      <div>
        <h2 className="li text-center text-3xl leading-[46px] text-primary-500">
          Our cake creation videos
        </h2>
        <p className="text-center text-lg font-light text-primary-300">Discover our process</p>
      </div>

      <Carousel className="w-full">
        <CarouselContent className="">
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
    </section>
  );
};

export default VideoSection;

import { useState } from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { play } from "@/assets/icons";

import videos from "../../../assets/videos";
import useWindowWidth from "@/hooks/useWindowWidth";

const InstaVideoList = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const windowWidth = useWindowWidth();

  const handleNavigate = (event: React.MouseEvent, url: string) => {
    event.stopPropagation();
    window.open(url, "_blank");
  };

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
              key={v.url}
              className="flex-shrink-0 basis-auto cursor-pointer select-none pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <motion.div
                onClick={(event) => handleNavigate(event, v.url)}
                whileInView={{ scale: 1, opacity: 1 }}
                initial={{ scale: 1.1, opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
              >
                <div
                  className="relative"
                  onMouseOver={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                  onFocus={() => setIsHovered(index)}
                  onBlur={() => setIsHovered(null)}
                >
                  <div
                    className={`absolute inset-0 flex h-[383px] w-[220px] items-center justify-center bg-gray-800 bg-cover bg-center bg-no-repeat duration-300 sm:h-full sm:w-full ${isHovered !== index ? "" : "opacity-0"}`}
                    style={{ backgroundImage: `url(${v.image})`, zIndex: 10 }}
                  >
                    <button
                      className="flex size-10 select-none items-center justify-center bg-black/50"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsHovered(index);
                      }}
                    >
                      <img src={play} alt="play_icon" />
                    </button>
                  </div>

                  <ReactPlayer
                    url={`${v.video}`}
                    width={windowWidth > 640 ? `100%` : `220px`}
                    height={windowWidth > 640 ? `100%` : `383px`}
                    playing={isHovered === index}
                    controls={false}
                    loop
                    muted
                  />
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default InstaVideoList;

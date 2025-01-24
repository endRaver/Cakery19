import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { next, prev } from "@/assets/icons";

import sliders from "@/assets/slider_image";
import "./slider_style.css";
import useWindowWidth from "@/hooks/useWindowWidth";

export const ValueSlider = () => {
  const windowWidth = useWindowWidth();

  return (
    <Swiper
      effect={windowWidth > 1024 ? "coverflow" : ""}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 0,
        stretch: 70,
        depth: 40,
        modifier: 10,
      }}
      pagination={{
        el: ".swiper-pagination",
        clickable: true,
      }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      modules={[EffectCoverflow, Pagination, Navigation]}
      className="swiper_container h-[400px]"
    >
      {sliders.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="flex justify-center duration-300">
            <div
              className="relative flex h-[200px] w-[320px] flex-col justify-end overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat p-8 shadow-xl sm:h-[320px] sm:w-[580px] md:h-[400px] md:w-[720px] lg:h-[320px] lg:w-[570px]"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
              <div className="z-20 max-w-[426px] space-y-1 p-2.5 text-white">
                <h3 className="text-4xl font-medium tracking-wider">{slide.title}</h3>
                <p className="text-lg font-light italic">{slide.description}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}

      <div className="slider-controller">
        <div className="swiper-button-prev box-content select-none rounded bg-black/30 px-2">
          <img src={prev} className="h-4 w-4 shrink-0" />
        </div>
        <div className="swiper-button-next box-content select-none rounded bg-black/30 px-2">
          <img src={next} className="h-4 w-4 shrink-0" />
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </Swiper>
  );
};

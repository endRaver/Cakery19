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
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 0,
        stretch: windowWidth > 1546 ? 100 : windowWidth > 880 ? 70 : windowWidth > 640 ? 50 : 30,
        depth: windowWidth > 880 ? 20 : 20,
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
      className="swiper_container !pb-14 !pt-0"
    >
      {sliders.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="flex justify-center duration-300">
            <div className="relative flex h-[228px] w-[360px] flex-col justify-end overflow-hidden rounded p-4 shadow-xl sm:h-[320px] sm:w-[570px] sm:rounded-lg sm:p-8">
              <picture className="flex-1">
                <source srcSet={`${(slide.image)}`} type="image/webp" />
                <img
                  src={`${slide.image}`}
                  alt={"value_banner"}
                  loading="eager"
                  className="absolute left-0 top-0 h-full w-full object-cover object-center"
                  onLoad={(e) => (e.target as HTMLImageElement).classList.add("loaded")}
                />
              </picture>

              <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/20"></div>
              <div className="z-20 max-w-[426px] space-y-1 p-2.5 text-white">
                <h3 className="text-xl font-medium tracking-wider sm:text-4xl">{slide.title}</h3>
                <p className="text-sm font-light italic sm:text-lg">{slide.description}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}

      <div className="slider-controller">
        {windowWidth > 640 && (
          <>
            <div className="swiper-button-prev box-content select-none rounded bg-black/30 px-2 duration-300 hover:bg-primary-50/30 sm:!left-[2%] md:!left-[10%] lg:!left-[17%] xl:!left-[20%]">
              <img src={prev} className="h-4 w-4 shrink-0" />
            </div>
            <div className="swiper-button-next box-content select-none rounded bg-black/30 px-2 duration-300 hover:bg-primary-50/30 sm:!right-[2%] md:!right-[10%] lg:!right-[17%] xl:!right-[20%]">
              <img src={next} className="h-4 w-4 shrink-0" />
            </div>
          </>
        )}

        <div className="swiper-pagination"></div>
      </div>
    </Swiper>
  );
};

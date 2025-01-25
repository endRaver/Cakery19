import { Navigation } from "swiper/modules";
import { EffectCoverflow } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductImageDisplayMobile = ({ productImages }: { productImages: string[] }) => {
  return (
    <Swiper
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
      modules={[EffectCoverflow, Pagination, Navigation]}
      className="swiper_container !p-0"
    >
      {productImages.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="flex justify-center duration-300">
            <div
              className="relative flex h-[390px] w-full flex-col justify-end overflow-hidden bg-cover bg-center bg-no-repeat p-8 shadow-xl"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </div>
        </SwiperSlide>
      ))}

      {/* NOTE: Temporary fix need at least 3 images */}
      {productImages.length < 3 &&
        productImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center duration-300">
              <div
                className="relative flex h-[390px] w-full flex-col justify-end overflow-hidden bg-cover bg-center bg-no-repeat p-8 shadow-xl"
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            </div>
          </SwiperSlide>
        ))}

      <div className="slider-controller">
        <div className="swiper-pagination"></div>
      </div>
    </Swiper>
  );
};

export default ProductImageDisplayMobile;

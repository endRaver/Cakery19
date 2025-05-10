import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { Navigation } from "swiper/modules";
import { EffectCoverflow } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductImageDisplayMobile = ({ productImages }: { productImages: string[] }) => {
  return (
    <div className="relative">
      <a
        href="/shop"
        className={cn(
          buttonVariants({ variant: "outline" }) +
            " absolute left-3 top-3 z-10 rounded-full p-3 text-primary-400 hover:bg-primary-50"
        )}
      >
        <ChevronLeft />
      </a>

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
            <div className="relative aspect-square w-full overflow-hidden shadow-xl">
              <picture>
                <source srcSet={image} type="image/webp" />
                <img
                  src={image}
                  alt={image}
                  loading="eager"
                  className="fade-in-image h-full w-full object-cover object-center"
                  onLoad={(e) => (e.target as HTMLImageElement).classList.add("loaded")}
                />
              </picture>
            </div>
          </SwiperSlide>
        ))}

        {/* NOTE: Temporary fix need at least 3 images */}
        {productImages.length < 3 &&
          productImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative aspect-square w-full overflow-hidden shadow-xl">
                <picture>
                  <source srcSet={image} type="image/webp" />
                  <img
                    src={image}
                    alt={image}
                    loading="eager"
                    className="fade-in-image h-full w-full object-cover object-center"
                    onLoad={(e) => (e.target as HTMLImageElement).classList.add("loaded")}
                  />
                </picture>
              </div>
            </SwiperSlide>
          ))}

        <div className="slider-controller">
          <div className="swiper-pagination" />
        </div>
      </Swiper>
    </div>
  );
};

export default ProductImageDisplayMobile;

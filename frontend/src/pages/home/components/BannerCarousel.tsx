import { Button } from "@/components/ui/button";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Carousel } from "@/components/ui/carousel";
import { Link } from "react-router-dom";

import Autoplay from "embla-carousel-autoplay";

const quoteStyle =
  "min-w-[360px] text-center text-4xl font-light leading-[46px] tracking-wide text-[#F8F4F0] sm:text-left sm:text-5xl lg:text-[54px] sm:text-[54px] sm:leading-[54px] lg:leading-[68px]";

const BannerCarousel = () => {
  return (
    <section className="h-full w-full overflow-hidden">
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{ loop: true }}
      >
        <CarouselContent className="select-none">
          <CarouselItem className="pl-0">
            <div
              className="relative h-[680px] w-full overflow-hidden bg-cover bg-center bg-no-repeat lg:h-[734px]"
              style={{ backgroundImage: 'url("/images/cakery_banner_1.jpg")' }}
            >
              <div className="absolute bottom-6 left-[calc(50%+8px)] flex max-w-[540px] -translate-x-1/2 flex-col items-center space-y-6 p-2.5 sm:bottom-[146px] sm:left-[50px] sm:translate-x-0 sm:items-start lg:max-w-[697px]">
                <h1 className={quoteStyle}>
                  <span className="font-medium">Baker</span> with love,
                  <br /> served with a <span className="font-medium">Smile</span>
                </h1>

                <p className="hidden text-justify text-lg font-light text-[#F8F4F0] sm:block">
                  Baked with passion, delivered with joy, our artisanal treats embody the essence of
                  our bakery. A delightful blend of love and warmth, served with a smile, inviting
                  you to savor every moment of indulgence.
                </p>

                <div className="flex items-center gap-2.5">
                  <Button className="h-[35px] rounded-[2px] bg-[#89896E] p-1 hover:bg-hover-outline_btn">
                    <Link
                      to="/"
                      className="rounded-[2px] border border-primary-50/40 px-5 py-1.5 text-xs font-medium"
                    >
                      Let's Eat
                    </Link>
                  </Button>

                  <Button className="h-[34px] rounded-[2px] border-2 border-primary-50 bg-transparent px-6 py-2 hover:bg-hover-outline_btn">
                    <Link to="/" className="text-xs font-medium">
                      Book now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="pl-0">
            <div
              className="relative h-[680px] w-full bg-cover bg-center bg-no-repeat lg:h-[734px]"
              style={{ backgroundImage: 'url("/images/menu_banner.jpg")' }}
            >
              <div className="absolute bottom-6 left-[calc(50%+8px)] flex max-w-[540px] -translate-x-1/2 flex-col items-center space-y-6 p-2.5 sm:bottom-[146px] sm:left-[50px] sm:translate-x-0 sm:items-start lg:max-w-[697px]">
                <h1 className={quoteStyle}>
                  <span className="font-medium">Baker</span> with love, <br /> served with a{" "}
                  <span className="font-medium">Smile</span>
                </h1>

                <p className="hidden text-justify text-lg font-light text-[#F8F4F0] sm:block">
                  Baked with passion, delivered with joy, our artisanal treats embody the essence of
                  our bakery. A delightful blend of love and warmth, served with a smile, inviting
                  you to savor every moment of indulgence.
                </p>

                <div className="flex items-center gap-2.5">
                  <Button className="h-[35px] rounded-[2px] bg-[#89896E] p-1 hover:bg-hover-outline_btn">
                    <Link
                      to="/"
                      className="rounded-[2px] border border-primary-50/40 px-5 py-1.5 text-xs font-medium"
                    >
                      Let's Eat
                    </Link>
                  </Button>

                  <Button className="h-[34px] rounded-[2px] border-2 border-primary-50 bg-transparent px-6 py-2 hover:bg-hover-outline_btn">
                    <Link to="/" className="text-xs font-medium">
                      Book now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default BannerCarousel;

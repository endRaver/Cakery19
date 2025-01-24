import { Button } from "@/components/ui/button";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Carousel } from "@/components/ui/carousel";
import { Link } from "react-router-dom";

import Autoplay from "embla-carousel-autoplay";

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
      >
        <CarouselContent>
          <CarouselItem className="pl-0">
            <div
              className="relative h-[734px] w-full overflow-hidden bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url("/images/cakery_banner_1.jpg")' }}
            >
              <div className="absolute bottom-[146px] left-[50px] max-w-[697px] space-y-6">
                <h1 className="text-[54px] font-light leading-[68px] tracking-wide text-[#F8F4F0]">
                  <span className="font-medium">Baker</span> with love, <br /> served with a{" "}
                  <span className="font-medium">Smile</span>
                </h1>

                <p className="text-lg font-light text-[#F8F4F0]">
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
              className="relative h-[734px] w-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url("/images/menu_banner.jpg")' }}
            >
              <div className="absolute bottom-[146px] left-[50px] max-w-[697px] space-y-6 p-2.5">
                <h1 className="text-[54px] font-light leading-[68px] tracking-wide text-[#F8F4F0]">
                  <span className="font-medium">Baker</span> with love, <br /> served with a{" "}
                  <span className="font-medium">Smile</span>
                </h1>

                <p className="text-lg font-light text-[#F8F4F0]">
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

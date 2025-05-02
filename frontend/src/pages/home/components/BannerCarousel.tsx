import { Button } from "@/components/ui/button";
import { CarouselContent, CarouselItem, Carousel } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";

const quoteStyle =
  "min-w-[360px] text-center text-4xl font-light leading-[46px] tracking-wide text-[#F8F4F0] sm:text-left sm:text-5xl lg:text-[54px] sm:text-[54px] sm:leading-[54px] lg:leading-[68px]";

interface SlideContent {
  image: {
    webp: string;
    jpg: string;
    alt: string;
  };
  heading: {
    first: string;
    second: string;
    third: string;
  };
  description: string;
  buttons: {
    primary: {
      text: string;
      link: string;
    };
    secondary: {
      text: string;
      link: string;
    };
  };
}

const slides: SlideContent[] = [
  {
    image: {
      webp: "/images/webp/cakery_banner_1.webp",
      jpg: "/images/cakery_banner_1.jpg",
      alt: "Bakery Hero Banner showing fresh baked goods",
    },
    heading: {
      first: "Baker",
      second: "with love,",
      third: "Smile",
    },
    description:
      "Baked with passion, delivered with joy, our artisanal treats embody the essence of our bakery. A delightful blend of love and warmth, served with a smile, inviting you to savor every moment of indulgence.",
    buttons: {
      primary: {
        text: "Let's Eat",
        link: "/menu",
      },
      secondary: {
        text: "Book now",
        link: "/reservations",
      },
    },
  },
  {
    image: {
      webp: "/images/webp/login_banner.webp",
      jpg: "/images/login_banner.jpg",
      alt: "Bakery Special Offers and Occasions",
    },
    heading: {
      first: "Special",
      second: "treats for",
      third: "Occasion",
    },
    description:
      "Celebrate life's special moments with our handcrafted delights. From birthdays to anniversaries, our custom cakes and pastries make every occasion sweeter.",
    buttons: {
      primary: {
        text: "View Menu",
        link: "/menu",
      },
      secondary: {
        text: "Order Now",
        link: "/order",
      },
    },
  },
];

const BannerCarousel = () => {
  return (
    <section className="h-full w-full overflow-hidden" aria-label="Featured bakery items">
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
        ]}
        opts={{
          loop: true,
          skipSnaps: false,
          dragFree: false,
        }}
      >
        <CarouselContent className="select-none">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative h-[680px] w-full overflow-hidden lg:h-[734px]">
                <picture>
                  <source srcSet={slide.image.webp} type="image/webp" />
                  <img
                    src={slide.image.jpg}
                    alt={slide.image.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="fade-in-image absolute inset-0 h-full w-full object-cover object-center"
                    onLoad={(e) => (e.target as HTMLImageElement).classList.add("loaded")}
                  />
                </picture>

                <motion.div
                  className="absolute bottom-6 left-[calc(50%+8px)] flex max-w-[540px] !-translate-x-1/2 flex-col items-center space-y-6 p-2.5 sm:bottom-[146px] sm:left-[50px] sm:!translate-x-0 sm:items-start lg:max-w-[697px]"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5 }}
                  role="details"
                  aria-label={`Slide ${index + 1} content`}
                >
                  <h1 className={quoteStyle}>
                    <span className="font-medium">{slide.heading.first}</span>{" "}
                    {slide.heading.second}
                    <br /> every <span className="font-medium">{slide.heading.third}</span>
                  </h1>

                  <p className="hidden text-justify text-lg font-light text-[#F8F4F0] sm:block">
                    {slide.description}
                  </p>

                  <div className="flex items-center gap-2.5">
                    <Button className="h-[35px] rounded-[2px] bg-primary_btn p-1 hover:bg-hover-outline_btn">
                      <Link
                        to={slide.buttons.primary.link}
                        className="rounded-[2px] border border-primary-50/40 px-5 py-1.5 text-xs font-medium"
                      >
                        {slide.buttons.primary.text}
                      </Link>
                    </Button>

                    <Button className="h-[34px] rounded-[2px] border-2 border-primary-50 bg-transparent px-6 py-2 hover:bg-hover-outline_btn">
                      <Link to={slide.buttons.secondary.link} className="text-xs font-medium">
                        {slide.buttons.secondary.text}
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default BannerCarousel;

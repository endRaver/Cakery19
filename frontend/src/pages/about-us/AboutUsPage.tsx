import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

import { ValueSlider } from "./components/ValueSlider";
import useWindowWidth from "@/hooks/useWindowWidth";

const AboutUsPage = () => {
  const windowWidth = useWindowWidth();

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Starts zooming slower and finishes earlier
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 70 });

  return (
    <main className="my-5 space-y-5 text-primary-500 md:my-10 md:space-y-10">
      <section className="container mx-auto flex flex-col gap-x-10 gap-y-8 md:flex-row md:py-11 lg:gap-x-20">
        <div className="flex-1 md:mt-10">
          <h2 className="text-4xl font-medium">About Our Sweet Story</h2>
          <div className="mt-[18px] border-[#89896E] md:border-l-4">
            <p className="leading-7 tracking-wider md:ps-10 lg:max-w-[600px]">
              It is a long established fact that a reader will be distracted by the readable content
              of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
              <br />
              <br />
              Many desktop publishing packages and web page editors now use Lorem Ipsum as their
              default model text, and a search for 'lorem ipsum' will uncover many web sites still
              in their infancy. Various versions have evolved over the years, sometimes by accident,
              sometimes on purpose (injected humour and the like).
            </p>

            <Button className="bg-primary_btn mt-6 h-[35px] rounded-[2px] p-1 hover:bg-hover-outline_btn md:ms-10">
              <Link
                to="/"
                className="rounded-[2px] border border-primary-50/40 px-5 py-1.5 text-xs font-medium"
              >
                Read More
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden" ref={ref}>
          <picture className="flex-1">
            <source srcSet={`/images/webp/about_me.webp`} type="image/webp" />
            <motion.img
              src={`/images/webp/about_me.jpg`}
              alt={"login_banner"}
              loading="eager"
              className="h-full max-h-[640px] w-full object-cover object-center md:max-h-[700px]"
              onLoad={(e) => (e.target as HTMLImageElement).classList.add("loaded")}
              style={{ scale: smoothScale }}
            />
          </picture>
        </div>
      </section>

      <section className="container mx-auto flex justify-center py-5 lg:py-14">
        <p className="w-fit overflow-hidden rounded bg-[#D9BEA7] px-5 py-5 text-center text-sm font-light italic text-[#69693F] sm:text-lg md:px-10 md:text-2xl">
          “” It is a long established fact that a reader will be distracted by the readable content
          of a page when looking at its layout. “”
        </p>
      </section>

      <section className={windowWidth > 1280 ? "container mx-auto" : ""}>
        <h2 className="mb-10 text-center text-4xl font-medium">Our Value</h2>

        <ValueSlider />
      </section>
    </main>
  );
};

export default AboutUsPage;

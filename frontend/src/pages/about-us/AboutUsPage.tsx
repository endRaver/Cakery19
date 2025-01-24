import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import useWindowWidth from "@/context/useWindowWidth";
import { ValueSlider } from "./components/ValueSlider";

const AboutUsPage = () => {
  const windowWidth = useWindowWidth();

  return (
    <main className="my-10 space-y-10 text-primary-500">
      <section className="container mx-auto flex gap-20 py-11">
        <div className="mt-10 flex-1">
          <h2 className="text-4xl font-medium">About Our Sweet Story</h2>
          <div className="mt-[18px] border-l-4 border-[#89896E]">
            <p className="max-w-[466px] ps-10 tracking-wider lg:max-w-[600px]">
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

            <Button className="ms-10 mt-6 h-[35px] rounded-[2px] bg-[#89896E] p-1 hover:bg-hover-outline_btn">
              <Link
                to="/"
                className="rounded-[2px] border border-primary-50/40 px-5 py-1.5 text-xs font-medium"
              >
                Read More
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <img
            src="/images/about_me.jpg"
            alt="about_me"
            className="h-full max-h-[700px] w-full object-cover object-center"
          />
        </div>
      </section>

      <section className="container mx-auto flex justify-center py-14">
        <p className="w-fit overflow-hidden rounded bg-[#D9BEA7] px-10 py-5 text-center text-2xl font-light italic text-[#69693F]">
          “” It is a long established fact that a reader will be distracted by the <br />
          readable content of a page when looking at its layout. “”
        </p>
      </section>

      <section className={windowWidth > 1280 ? "container mx-auto" : ""}>
        <h2 className="text-center text-4xl font-medium">Our Value</h2>

        <ValueSlider />
      </section>
    </main>
  );
};

export default AboutUsPage;

import { Link } from "react-router-dom";
import BannerCarousel from "./components/BannerCarousel";
import SignatureProductList from "./components/SignatureProductList";
import VideoBanner from "./components/VideoBanner";
import InstaVideoList from "./components/InstaVideoList";

const HomePage = () => {
  return (
    <div className="space-y-[60px]">
      <BannerCarousel />

      <section className="container mx-auto space-y-10">
        <div>
          <h2 className="li text-center text-3xl leading-[46px] text-primary-500">
            Discover our signature
          </h2>
          <p className="text-center text-lg font-light text-primary-300">Best seller of all time</p>
        </div>
        <SignatureProductList />

        <div className="flex items-center justify-center gap-1.5">
          <div className="h-[1px] w-full max-w-[320px] border-t border-primary-400"></div>
          <div className="group flex flex-col">
            <div className="h-[1px] w-1/3 bg-primary-400 duration-300 group-hover:w-full"></div>
            <Link to="/shop" className="text-nowrap px-3 py-2 text-primary-400">
              <p>Explore Our Menu</p>
            </Link>
            <div className="ml-auto h-[1px] w-1/3 bg-primary-400 duration-300 group-hover:w-full"></div>
          </div>
          <div className="h-[1px] w-full max-w-[320px] border-t border-primary-400"></div>
        </div>
      </section>

      <section className="container mx-auto space-y-10">
        <div>
          <h2 className="li text-center text-3xl leading-[46px] text-primary-500">
            Our cake creation videos
          </h2>
          <p className="text-center text-lg font-light text-primary-300">Discover our process</p>
        </div>
        <InstaVideoList />
      </section>

      <section>
        <div className="container mx-auto flex justify-center gap-14 py-10">
          <h2 className="text-4xl font-light leading-[56px] tracking-widest text-primary-500">
            THE KNOW - <br /> <span className="text-nowrap">HOW CAKERY 19</span>
          </h2>

          <p className="max-w-[564px] text-justify text-sm leading-6 tracking-wide text-primary-500">
            Passed by renowned restaurants and starred palaces, he invents a pastry where sweet and
            savory borrow the same codes of cooking, seasoning, condiments. Quickly his creations of
            high flight are praised by the critics and his name circulates very quickly from mouths
            to ears of gastronomes. In addition to its vaporous meringues where its refined
            compositions, the All-Paris rushes to discover its famous Vanilla Millefeuille. A real
            signature dish, this dessert, awarded the title of "Dessert of the Year" by the LEBEY
            guide in 2014, beautifully presented the artistic fiber of Yann COUVREUR.
          </p>
        </div>

        <VideoBanner />
      </section>
    </div>
  );
};

export default HomePage;

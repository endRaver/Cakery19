import BannerCarousel from "./components/BannerCarousel";
import VideoBanner from "./components/VideoBanner";
import InstaVideoList from "./components/InstaVideoList";
import useWindowWidth from "@/hooks/useWindowWidth";
import RecommendationProducts from "@/components/RecommendationProducts";
import { useProductStore } from "@/stores/useProductStore";
import { useEffect } from "react";

const HomePage = () => {
  const windowWidth = useWindowWidth();
  const { filteredProducts, fetchProductsByCategory } = useProductStore();

  useEffect(() => {
    fetchProductsByCategory(["signature"], 3);
  }, [fetchProductsByCategory]);

  return (
    <div className="space-y-10 lg:space-y-[60px]">
      <BannerCarousel />

      <section className="container mx-auto space-y-10">
        <div>
          <h2 className="text-center text-2xl text-primary-500 sm:text-3xl sm:leading-[46px]">
            Discover our signature
          </h2>
          <p className="text-center font-light tracking-wider text-primary-300 sm:text-sm lg:text-lg">
            Best seller of all time
          </p>
        </div>
        <RecommendationProducts products={filteredProducts} />

        <div className="flex items-center justify-center gap-1.5">
          <div className="h-[1px] w-full max-w-[320px] border-t border-primary-400"></div>
          <div className="group flex flex-col">
            <div className="h-[1px] w-1/3 bg-primary-400 duration-300 group-hover:w-full"></div>
            <a href="/shop" className="text-nowrap px-3 py-2 text-primary-400">
              <p>Explore Our Menu</p>
            </a>
            <div className="ml-auto h-[1px] w-1/3 bg-primary-400 duration-300 group-hover:w-full"></div>
          </div>
          <div className="h-[1px] w-full max-w-[320px] border-t border-primary-400"></div>
        </div>
      </section>

      <section className="container mx-auto space-y-10">
        <div>
          <h2 className="text-center text-2xl text-primary-500 sm:text-3xl sm:leading-[46px]">
            Our cake creation videos
          </h2>
          <p className="text-center font-light tracking-wider text-primary-300 sm:text-sm lg:text-lg">
            Discover our process
          </p>
        </div>
        <InstaVideoList />
      </section>

      <section>
        <div className="container mx-auto flex flex-col justify-center gap-x-6 gap-y-5 pb-8 lg:flex-row lg:gap-14 lg:py-10">
          <h2 className="text-2xl font-light tracking-widest text-primary-500 lg:text-4xl lg:leading-[56px]">
            THE KNOW - {(windowWidth > 1024 || windowWidth <= 640) && <br />}
            <span className="text-nowrap">HOW CAKERY 19</span>
          </h2>

          <p className="text-justify text-sm leading-6 tracking-wide text-primary-500 lg:max-w-[564px]">
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

        <div className="relative h-[590px] sm:h-[620px] lg:h-[700px] xl:h-[800px]">
          <div className="relative h-full">
            <div className="absolute inset-0 bg-[#ABAB70]/20"></div>
            <img
              src="/images/map.png"
              alt="map"
              className="h-full w-full object-cover object-center opacity-50"
            />
          </div>

          <div className="absolute inset-0 bottom-0 left-1/2 flex w-64 -translate-x-1/2 flex-col items-center justify-center sm:left-14 sm:translate-x-0">
            <div className="relative h-[200px] w-full overflow-hidden">
              <img
                src="/images/store_placeholder.jpg"
                alt="store_img"
                className="absolute left-0 top-0 h-full w-full object-cover object-center"
              />
            </div>

            <div className="w-full space-y-1 bg-[#846449] p-5 text-sm text-primary-50">
              <h2 className="font-medium">Take Away - Cakery 19</h2>
              <p className="font-light">Chef de cuisine et directeur général</p>
              <p className="font-light">
                <span className="font-normal">Hours:</span> 8:00 AM - 8:00 PM
              </p>
              <p>Mon - Fri</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

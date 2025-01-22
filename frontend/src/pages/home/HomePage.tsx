import BannerCarousel from "./components/BannerCarousel";

const HomePage = () => {
  return (
    <>
      <section className="w-full">
        <BannerCarousel />
      </section>

      <section className="container mx-auto">{/* Other content that needs container */}</section>
    </>
  );
};

export default HomePage;

import BannerCarousel from "./components/BannerCarousel";
import SignatureProductSection from "./components/SignatureProductSection";
import VideoSection from "./components/VideoSection";

const HomePage = () => {
  return (
    <div className="space-y-[60px]">
      <BannerCarousel />

      <SignatureProductSection />

      <VideoSection />
    </div>
  );
};

export default HomePage;

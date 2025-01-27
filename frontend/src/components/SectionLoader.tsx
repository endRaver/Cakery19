import { cakery_logo_light } from "@/assets/icons";

const SectionLoader = () => {
  return (
    <div className="flex h-[calc(100vh-156px)] w-full items-center justify-center">
      <div className="animate-bounce rounded-full bg-primary-500 p-8 shadow-xl duration-1000">
        <img src={cakery_logo_light} className="size-20" alt="logo" />
      </div>
    </div>
  );
};

export default SectionLoader;

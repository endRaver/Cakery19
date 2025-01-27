import { cakery_logo_light } from "@/assets/icons";

const FullpageLoader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="animate-ping rounded-full bg-primary-500 p-8 duration-1000">
        <img src={cakery_logo_light} className="size-20" alt="logo" />
      </div>
    </div>
  );
};

export default FullpageLoader;

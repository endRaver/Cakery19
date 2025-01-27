const FullWidthBanner = ({
  className,
  webpImage,
  jpegImage,
}: {
  className?: string;
  webpImage?: string;
  jpegImage?: string;
}) => {
  return (
    <div className={`h-[425px] w-full overflow-hidden ${className} `}>
      <picture>
        {/* WebP format for modern browsers */}
        <source srcSet={webpImage} type="image/webp" />
        {/* Fallback JPEG for older browsers */}
        <img
          src={jpegImage}
          alt="Bakery Hero Banner"
          loading="eager"
          className="h-full w-full object-cover object-center"
          onLoad={(e) => (e.target as HTMLImageElement).classList.add("loaded")}
        />
      </picture>
    </div>
  );
};

export default FullWidthBanner;

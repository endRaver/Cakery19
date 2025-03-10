interface TopbarLinkToolTipProps {
  url: string;
  label: string;
  images: { light: string; dark: string };
  isLight: boolean;
  newTab?: boolean;
  className?: string;
  imgClassName?: string;
}

const TopbarLinkToolTip = ({
  url,
  label,
  images,
  isLight,
  newTab = false,
  className,
  imgClassName,
}: TopbarLinkToolTipProps) => {
  return (
    <div className={`group relative ${className}`}>
      <a
        href={url}
        target={newTab ? "_blank" : undefined}
        rel="noopener noreferrer"
        className={`flex`}
      >
        {isLight ? (
          <img src={images.light} className={`size-5 ${imgClassName}`} alt="icon" />
        ) : (
          <img src={images.dark} className={`size-5 ${imgClassName}`} alt="icon" />
        )}
      </a>

      <div className="absolute left-1/2 top-9 -translate-x-1/2 cursor-default text-nowrap rounded-md bg-primary-50 px-2 py-1 text-sm text-primary-200 opacity-0 shadow-lg duration-500 group-hover:opacity-100">
        {label}
        <div className="absolute left-1/2 top-[-5px] h-2 w-2 -translate-x-1/2 rotate-45 bg-primary-50" />
      </div>
    </div>
  );
};

export default TopbarLinkToolTip;

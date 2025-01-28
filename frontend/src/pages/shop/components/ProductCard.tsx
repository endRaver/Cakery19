import { Product } from "@/types";

// Utility function to optimize image URL
const optimizeImageUrl = (url: string, width: number = 800) => {
  // Check if it's already a Cloudinary URL
  if (url.includes("cloudinary.com")) {
    // Extract the base URL and transformation string
    const urlParts = url.split("/upload/");
    if (urlParts.length === 2) {
      // Add or update width transformation
      return `${urlParts[0]}/upload/w_${width},q_auto,f_auto/${urlParts[1]}`;
    }
  }
  return url; // Return original URL if not Cloudinary or invalid format
};

const ProductCard = ({
  product,
  isSquareImage = false,
}: {
  product: Product;
  isSquareImage?: boolean;
}) => {
  const createSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  // Calculate appropriate image widths based on container size
  const imageWidth = isSquareImage ? 600 : 800; // Adjust these values based on your needs

  return (
    <div className="group relative flex-1 lg:max-w-[309px] xl:max-w-[373px] 2xl:max-w-[448px]">
      <a href={`/shop/${createSlug(product.name)}?id=${product._id}`} className="">
        <div
          className={`relative w-full overflow-hidden ${isSquareImage ? "aspect-square" : "h-[380px]"}`}
        >
          <div className="absolute bottom-0 z-20 h-[180px] w-full bg-gradient-to-t from-black/80 to-transparent opacity-0 duration-500 ease-in-out group-hover:opacity-100"></div>

          <div className="group h-full w-full duration-500 ease-in-out group-hover:scale-125">
            <picture>
              <source
                srcSet={optimizeImageUrl(
                  product.imageUrl[1] ? product.imageUrl[1] : product.imageUrl[0],
                  imageWidth
                )}
                type="image/webp"
              />
              <img
                src={optimizeImageUrl(
                  product.imageUrl[1] ? product.imageUrl[1] : product.imageUrl[0],
                  imageWidth
                )}
                alt={product.name}
                loading="lazy"
                className="fade-in-image absolute top-0 h-full w-full object-cover object-center duration-500 ease-in-out group-hover:scale-110"
                onLoad={(e) => (e.target as HTMLImageElement).classList.add("loaded")}
              />
            </picture>

            <picture>
              <source
                srcSet={optimizeImageUrl(product.imageUrl[0], imageWidth)}
                type="image/webp"
              />
              <img
                src={optimizeImageUrl(product.imageUrl[0], imageWidth)}
                alt={product.name}
                loading="lazy"
                className="fade-in-image absolute top-0 h-full w-full object-cover object-center duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-0"
                onLoad={(e) => (e.target as HTMLImageElement).classList.add("loaded")}
              />
            </picture>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 z-30 text-sm duration-500 ease-in-out group-hover:bottom-16 group-hover:left-5 group-hover:text-primary-50">
          <h4 className="font-medium uppercase tracking-wider">{product.name}</h4>
          <p className="italic">From {product.variants[0].price.toFixed(2)} CHF</p>
        </div>

        <p className="mt-2 line-clamp-2 min-h-10 overflow-hidden text-ellipsis text-sm tracking-wider opacity-0 duration-500 ease-in-out group-hover:opacity-100">
          {product.description}
        </p>
      </a>
    </div>
  );
};

export default ProductCard;

import { optimizeImageUrl } from "@/lib/imageOptimization";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

const ProductImageDisplay = ({ product }: { product: Product }) => {
  const [selectedImage, setSelectedImage] = useState(product.imageUrl[0]);

  useEffect(() => {
    setSelectedImage(product.imageUrl[0]);
  }, [product]);

  const imageWidth = 400;

  return (
    <div className="grid w-full grid-cols-[60px_auto] gap-8 lg:grid-cols-[80px_auto] xl:grid-cols-[110px_auto]">
      <div className="flex w-full flex-col gap-3">
        {product.imageUrl.map((image) => (
          <button
            key={image}
            className={`aspect-square w-full overflow-hidden border-2 p-1 duration-300 hover:border-primary-300 ${selectedImage === image ? "border-primary-300" : "border-primary-75"}`}
            onMouseOver={() => setSelectedImage(image)}
            onFocus={() => setSelectedImage(image)}
          >
            <picture>
              <source srcSet={optimizeImageUrl(image, imageWidth)} type="image/webp" />
              <img
                src={optimizeImageUrl(image, imageWidth)}
                alt={product.name}
                loading="eager"
                className="fade-in-image aspect-square h-full w-full object-cover object-center"
                onLoad={(e) => (e.target as HTMLImageElement).classList.add("loaded")}
              />
            </picture>
          </button>
        ))}
      </div>

      <div className="flex w-full items-center justify-center">
        <picture>
          <source srcSet={selectedImage.replace(".jpg", ".webp")} type="image/webp" />
          <img
            src={selectedImage}
            alt={product.name}
            loading="eager"
            className="fade-in-image aspect-square w-full rounded-sm object-cover object-center"
            onLoad={(e) => (e.target as HTMLImageElement).classList.add("loaded")}
          />
        </picture>
      </div>
    </div>
  );
};

export default ProductImageDisplay;

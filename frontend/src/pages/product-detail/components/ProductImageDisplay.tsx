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
    <>
      <picture>
        <source srcSet={selectedImage.replace(".jpg", ".webp")} type="image/webp" />
        <img
          src={selectedImage}
          alt={product.name}
          loading="eager"
          className="fade-in-image h-[480px] w-full rounded-lg object-cover object-center xl:h-[592px]"
          onLoad={(e) => (e.target as HTMLImageElement).classList.add("loaded")}
        />
      </picture>

      <div className="flex gap-2.5">
        {product.imageUrl.map((image) => (
          <button
            key={image}
            className={`cursor-pointer border-2 p-1 duration-300 hover:border-primary-300 ${selectedImage === image ? "border-primary-300" : "border-primary-75"}`}
            onMouseOver={() => setSelectedImage(image)}
            onFocus={() => setSelectedImage(image)}
          >
            <picture>
              <source srcSet={optimizeImageUrl(image, imageWidth)} type="image/webp" />
              <img
                src={optimizeImageUrl(image, imageWidth)}
                alt={product.name}
                loading="eager"
                className="fade-in-image aspect-square h-[80px] object-cover object-center xl:h-[130px]"
                onLoad={(e) => (e.target as HTMLImageElement).classList.add("loaded")}
              />
            </picture>
          </button>
        ))}
      </div>
    </>
  );
};

export default ProductImageDisplay;

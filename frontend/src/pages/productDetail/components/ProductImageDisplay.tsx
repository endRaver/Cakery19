import { Product } from "@/types";
import { useEffect, useState } from "react";

const ProductImageDisplay = ({ product }: { product: Product }) => {
  const [selectedImage, setSelectedImage] = useState(product.imageUrl[0]);

  useEffect(() => {
    setSelectedImage(product.imageUrl[0]);
  }, [product]);

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
        {product.imageUrl.map((image, index) => (
          <div
            key={index}
            className={`cursor-pointer border-2 p-1 duration-300 hover:border-primary-300 ${selectedImage === image ? "border-primary-300" : "border-primary-75"}`}
            onMouseOver={() => setSelectedImage(image)}
          >
            <picture>
              <source srcSet={image} type="image/webp" />
              <img
                src={image}
                alt={product.name}
                loading="eager"
                className="fade-in-image relative aspect-square h-[80px] object-cover object-center xl:h-[130px]"
                onLoad={(e) => (e.target as HTMLImageElement).classList.add("loaded")}
              />
            </picture>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductImageDisplay;

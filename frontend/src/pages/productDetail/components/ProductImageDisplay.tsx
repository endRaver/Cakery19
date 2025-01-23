import { Product } from "@/types";
import { useEffect, useState } from "react";

const ProductImageDisplay = ({ product }: { product: Product }) => {
  const [selectedImage, setSelectedImage] = useState(product.imageUrl[0]);

  useEffect(() => {
    setSelectedImage(product.imageUrl[0]);
  }, [product]);

  return (
    <>
      <div
        className="h-[592px] w-full rounded-lg bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${selectedImage})` }}
      ></div>

      <div className="flex gap-2.5">
        {product.imageUrl.map((image, index) => (
          <div
            key={index}
            className={`cursor-pointer border-2 p-1 duration-300 hover:border-primary-300 ${selectedImage === image ? "border-primary-300" : "border-primary-75"}`}
            onMouseOver={() => setSelectedImage(image)}
          >
            <div
              className={`relative aspect-square h-[130px] bg-cover bg-center bg-no-repeat p-1`}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductImageDisplay;

import { motion } from "framer-motion";

import { CarouselContent, Carousel, CarouselItem } from "@/components/ui/carousel";
import { Product } from "@/types/product";
import { map } from "lodash";
import { Link } from "react-router-dom";

const RecommendationProducts = ({ products }: { products: Product[] }) => {
  const createSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-"); // Replace spaces with hyphens
  };

  return (
    <Carousel className="w-full" opts={{ dragFree: true, loop: false }}>
      <CarouselContent className="ml-0 gap-2.5">
        {map(products, (product, index) => (
          <CarouselItem
            key={product._id}
            className="flex-shrink-0 basis-auto select-none overflow-hidden pl-0 sm:basis-1/2"
          >
            <Link to={`/shop/${createSlug(product.name)}?id=${product._id}`}>
              <motion.div
                className="group relative aspect-square min-h-[260px] flex-1 text-primary-50"
                whileInView={{ scale: 1, opacity: 1 }}
                initial={{ scale: 1.1, opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 * (index + 1) }}
              >
                <motion.div className="group h-full w-full duration-500 ease-in-out group-hover:scale-110">
                  <picture>
                    {/* WebP format for modern browsers */}
                    <source srcSet={product.imageUrl[0]} type="image/webp" />
                    {/* Fallback JPEG for older browsers */}
                    <img
                      src={product.imageUrl[0]}
                      alt={product.name}
                      loading="eager"
                      className="fade-in-image group h-full max-h-[304px] w-full object-cover object-center duration-500 ease-in-out sm:max-h-full"
                      onLoad={(e) => (e.target as HTMLImageElement).classList.add("loaded")}
                    />
                  </picture>
                  <div className="absolute inset-0 bg-black bg-opacity-0 duration-500 group-hover:bg-opacity-30"></div>
                </motion.div>
                <div className="absolute left-6 top-6">
                  <h4 className="text-lg font-medium uppercase">{product.name}</h4>
                  <p className="text-sm italic">From {product.variants[0].price.toFixed(2)} CHF</p>
                </div>
              </motion.div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default RecommendationProducts;

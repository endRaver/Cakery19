import { CarouselItem } from "@/components/ui/carousel";
import { CarouselContent } from "@/components/ui/carousel";
import { Carousel } from "@/components/ui/carousel";
import { Product } from "@/types";

const RecommendationProducts = ({ products }: { products: Product[] }) => {
  const createSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-"); // Replace spaces with hyphens
  };

  return (
    <Carousel className="w-full" opts={{ dragFree: true, loop: false }}>
      <CarouselContent className="ml-0 gap-2.5">
        {products.map((product) => (
          <CarouselItem
            key={product._id}
            className="flex-shrink-0 basis-auto select-none pl-0 sm:basis-1/2 lg:basis-1/3"
          >
            <a href={`/shop/${createSlug(product.name)}?id=${product._id}`}>
              <div className="group relative aspect-square min-h-[260px] flex-1 overflow-hidden text-primary-50">
                <div className="group h-full w-full duration-500 ease-in-out group-hover:scale-110">
                  <picture>
                    {/* WebP format for modern browsers */}
                    <source srcSet={product.imageUrl[0]} type="image/webp" />
                    {/* Fallback JPEG for older browsers */}
                    <img
                      src={product.imageUrl[0]}
                      alt={product.name}
                      loading="eager"
                      className="fade-in-image group h-full max-h-[304px] w-full object-cover object-center duration-500 ease-in-out group-hover:scale-110 sm:max-h-full"
                      onLoad={(e) => (e.target as HTMLImageElement).classList.add("loaded")}
                    />
                  </picture>
                  <div className="absolute inset-0 bg-black bg-opacity-0 duration-500 group-hover:bg-opacity-30"></div>
                </div>
                <div className="absolute left-6 top-6">
                  <h4 className="text-lg font-medium uppercase">{product.name}</h4>
                  <p className="text-sm italic">From {product.variants[0].price.toFixed(2)} CHF</p>
                </div>
              </div>
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default RecommendationProducts;

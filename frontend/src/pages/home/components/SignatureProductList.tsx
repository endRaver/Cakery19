import { CarouselItem } from "@/components/ui/carousel";
import { CarouselContent } from "@/components/ui/carousel";
import { Carousel } from "@/components/ui/carousel";
import { useProductStore } from "@/stores/useProductStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const SignatureProductList = () => {
  const { signatureProducts, fetchSignatureProducts } = useProductStore();

  useEffect(() => {
    fetchSignatureProducts();
  }, [fetchSignatureProducts]);

  return (
    <Carousel className="w-full" opts={{ dragFree: true, loop: false }}>
      <CarouselContent className="">
        {signatureProducts.map((product) => (
          <CarouselItem key={product._id} className="sm:basis-1/2 lg:basis-1/3">
            <Link to={`/shop/${product._id}`}>
              <div className="group relative aspect-square flex-1 overflow-hidden text-primary-50">
                <div
                  className="group h-full w-full bg-cover bg-center bg-no-repeat duration-500 ease-in-out group-hover:scale-125"
                  style={{ backgroundImage: `url("${product.imageUrl[0]}")` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-0 duration-500 group-hover:bg-opacity-30"></div>
                </div>
                <div className="absolute left-6 top-6">
                  <h4 className="text-lg font-medium uppercase">{product.name}</h4>
                  <p className="text-sm italic">From ${product.variants[0].price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default SignatureProductList;

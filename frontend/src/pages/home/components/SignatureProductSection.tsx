import { CarouselItem } from "@/components/ui/carousel";
import { CarouselContent } from "@/components/ui/carousel";
import { Carousel } from "@/components/ui/carousel";
import { useProductStore } from "@/stores/useProductStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const SignatureProductSection = () => {
  const { signatureProducts, fetchSignatureProducts } = useProductStore();

  useEffect(() => {
    fetchSignatureProducts();
  }, [fetchSignatureProducts]);

  return (
    <section className="container mx-auto space-y-10">
      <div>
        <h2 className="li text-center text-3xl leading-[46px] text-primary-500">
          Discover our signature
        </h2>
        <p className="text-center text-lg font-light text-primary-300">Best seller of all time</p>
      </div>

      <Carousel className="w-full">
        <CarouselContent className="">
          {signatureProducts.map((product) => (
            <CarouselItem key={product._id} className="sm:basis-1/2 lg:basis-1/3">
              <Link to={`/shop/${product._id}`}>
                <div className="relative aspect-square flex-1 overflow-hidden text-primary-50">
                  <div
                    className="group h-full w-full bg-cover bg-center bg-no-repeat duration-500 hover:scale-125"
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

      <div className="flex items-center justify-center gap-1.5">
        <div className="h-[1px] w-full max-w-[320px] border-t border-primary-400"></div>
        <div className="group flex flex-col">
          <div className="h-[1px] w-1/3 bg-primary-400 duration-300 group-hover:w-full"></div>
          <Link to="/shop" className="text-nowrap px-3 py-2 text-primary-400">
            <p>Explore Our Menu</p>
          </Link>
          <div className="ml-auto h-[1px] w-1/3 bg-primary-400 duration-300 group-hover:w-full"></div>
        </div>
        <div className="h-[1px] w-full max-w-[320px] border-t border-primary-400"></div>
      </div>
    </section>
  );
};

export default SignatureProductSection;

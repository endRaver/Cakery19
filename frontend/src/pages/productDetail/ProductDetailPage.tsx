import { useProductStore } from "@/stores/useProductStore";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TagBreadcrumb from "./components/TagBreadcrumb";
import ProductImageDisplay from "./components/ProductImageDisplay";
import { Button } from "@/components/ui/button";
import { gluten_free, nuts, plant_based, soy, sugar_free } from "@/assets/icons";
import ProductImageDisplayMobile from "./components/ProductImageDisplayMobile";
import useWindowWidth from "@/hooks/useWindowWidth";
import RecommendationProducts from "@/components/RecommendationProducts";

const buttonStyle =
  "px-5 py-2 rounded-md border border-primary-400 bg-transparent text-sm text-primary-400 hover:bg-primary-200 hover:text-primary-50 font-normal tracking-wider";

const ProductDetailPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const windowWidth = useWindowWidth();

  const {
    isLoading,
    currentProduct,
    signatureProducts,
    fetchProductsById,
    fetchSignatureProducts,
  } = useProductStore();

  const [selectedVariants, setSelectedVariants] = useState(currentProduct?.variants[0]);

  useEffect(() => {
    if (id) {
      fetchProductsById(id);
    }
  }, [fetchProductsById, id]);

  useEffect(() => {
    fetchSignatureProducts();
  }, [fetchSignatureProducts]);

  useEffect(() => {
    setSelectedVariants(currentProduct?.variants[0]);
  }, [currentProduct]);

  if (isLoading) return <div>Loading...</div>;

  if (!isLoading && currentProduct)
    return (
      <main className="mb-10 space-y-8 lg:space-y-10">
        {windowWidth <= 640 && (
          <ProductImageDisplayMobile productImages={currentProduct.imageUrl} />
        )}

        <section className="container mx-auto space-y-10">
          {windowWidth > 640 && <TagBreadcrumb product={currentProduct} />}

          <div className="flex flex-col gap-x-4 gap-y-8 md:flex-row lg:gap-x-10 2xl:gap-x-20">
            {windowWidth > 640 && (
              <div className="flex-1 space-y-6">
                <ProductImageDisplay product={currentProduct} />
              </div>
            )}

            {/* Product details */}
            <div className="flex-1 space-y-8">
              <div className="space-y-3 text-primary-400">
                <h1 className="mb-2 text-4xl font-medium uppercase lg:text-[51px] lg:leading-[51px]">
                  {currentProduct.name}
                </h1>

                <p className="text-lg">
                  {selectedVariants?.price ? selectedVariants.price.toFixed(2) : "N/A"} CHF
                </p>

                <p className="text-sm tracking-wider">{currentProduct.description}</p>
              </div>

              <div className="space-y-2.5">
                <h6 className="text-lg font-medium text-primary-500">Sizes</h6>

                <div className="flex gap-2">
                  {currentProduct.variants.map((variant, index) => (
                    <Button
                      variant="outline"
                      className={`${buttonStyle} ${selectedVariants === variant && "bg-primary-300 text-white"}`}
                      onClick={() => setSelectedVariants(variant)}
                      key={index}
                    >
                      {variant.size} cm
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <img src={plant_based} alt="icon" />
                  <p className="text-nowrap text-sm tracking-wider text-[#ABAB70]">Plant-based</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src={nuts} alt="icon" />
                  <p className="text-nowrap text-sm tracking-wider text-[#ABAB70]">Nuts</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src={gluten_free} alt="icon" />
                  <p className="text-nowrap text-sm tracking-wider text-[#ABAB70]">Gluten</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src={soy} alt="icon" />
                  <p className="text-nowrap text-sm tracking-wider text-[#ABAB70]">Soy</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src={sugar_free} alt="icon" />
                  <p className="text-nowrap text-sm tracking-wider text-[#ABAB70]">
                    Refined sugar free
                  </p>
                </div>
              </div>

              <div className="rounded bg-primary-200 px-5 py-6 text-xs tracking-wider text-primary-50">
                Delivery Methods
                <ul className="ms-2 mt-2 space-y-2">
                  <li>• Collect at the store</li>
                  <li>• Order Before 10PM today and collect tomorrow from 10AM</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div
            className="h-[425px] w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("/images/menu_banner.jpg")' }}
          ></div>
        </section>

        <section className="container mx-auto space-y-6 py-10 lg:space-y-10">
          <div>
            <h2 className="text-center text-2xl text-primary-500 sm:text-3xl sm:leading-[46px]">
              Our recommendations
            </h2>
            <p className="text-center font-light tracking-wider text-primary-300 sm:text-sm lg:text-lg">
              You might also like
            </p>
          </div>

          <RecommendationProducts products={signatureProducts} />
        </section>
      </main>
    );
};

export default ProductDetailPage;

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Variant } from "@/types/product";

import { useCartStore } from "@/stores/useCartStore";
import { useProductStore } from "@/stores/useProductStore";
import { useUserStore } from "@/stores/useUserStore";

import { gluten_free, nuts, plant_based, soy, sugar_free } from "@/assets/icons";
import TagBreadcrumb from "./components/TagBreadcrumb";
import ProductImageDisplay from "./components/ProductImageDisplay";
import ProductImageDisplayMobile from "./components/ProductImageDisplayMobile";
import useWindowWidth from "@/hooks/useWindowWidth";
import RecommendationProducts from "@/components/RecommendationProducts";
import FullWidthBanner from "@/components/FullWidthBanner";
import BreadCrumbSkeleton from "@/components/skeletons/BreadCrumbSkeleton";
import ProductDisplaySkeleton from "@/components/skeletons/ProductDisplaySkeleton";
import ProductDetailSkeleton from "@/components/skeletons/ProductDetailSkeleton";
import ProductDisplayMobileSkeleton from "@/components/skeletons/ProductDisplayMobileSkeleton";
import ChangeQuantitySelection from "@/components/ChangeQuantitySelection";
import AnimatedButton from "../../components/AnimatedButton";
import { Loader2 } from "lucide-react";

const ProductDetailPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const windowWidth = useWindowWidth();
  const navigate = useNavigate();

  const {
    isLoading,
    currentProduct,
    filteredProducts,
    fetchProductsById,
    fetchProductsByCategory,
  } = useProductStore();

  const { user } = useUserStore();

  const { handleAddToCart, isLoading: isCartLoading } = useCartStore();

  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(
    currentProduct?.variants[0]
  );

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity >= 9) return;
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  useEffect(() => {
    if (id) {
      fetchProductsById(id);
    }
  }, [fetchProductsById, id]);

  useEffect(() => {
    if (currentProduct?.category && currentProduct?.category.length > 0) {
      fetchProductsByCategory(currentProduct.category, 3);
    } else {
      fetchProductsByCategory(["signature"], 3);
    }
  }, [currentProduct, fetchProductsByCategory]);

  useEffect(() => {
    setSelectedVariant(currentProduct?.variants[0]);
  }, [currentProduct]);

  if (isLoading)
    return (
      <main className="mb-10 space-y-8 lg:space-y-10">
        {windowWidth <= 880 && <ProductDisplayMobileSkeleton />}

        <section className="container mx-auto space-y-10">
          {windowWidth > 880 && <BreadCrumbSkeleton />}

          <div className="flex flex-col gap-x-4 gap-y-8 md:flex-row lg:gap-x-10 2xl:gap-x-20">
            {windowWidth > 880 && (
              <div className="flex-1 space-y-6">
                <ProductDisplaySkeleton />
              </div>
            )}

            <div className="flex-1 space-y-8">
              <ProductDetailSkeleton />
            </div>
          </div>
        </section>
      </main>
    );

  if (!isLoading && currentProduct)
    return (
      <main className="mb-10 space-y-8 lg:space-y-10">
        {windowWidth <= 880 && (
          <ProductImageDisplayMobile productImages={currentProduct.imageUrl} />
        )}

        <section className="container mx-auto space-y-10">
          {windowWidth > 880 && <TagBreadcrumb product={currentProduct} />}

          <div className="flex gap-x-4 gap-y-8 md:flex-row lg:gap-x-10 2xl:gap-x-20">
            {windowWidth > 880 && (
              <div className="basis-full space-y-6 lg:basis-[100%]">
                <ProductImageDisplay product={currentProduct} />
              </div>
            )}

            <div className="basic-full lg:max-w-[70%] space-y-8 lg:basis-[70%]">
              <div className="space-y-3 text-primary-400">
                <h1 className="mb-2 text-2xl font-medium uppercase lg:text-[51px] lg:leading-[51px]">
                  {currentProduct.name}
                </h1>

                <p className="text-lg">
                  {selectedVariant?.price ? selectedVariant.price.toFixed(2) : "N/A"} CHF
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="flex gap-2">
                  {currentProduct.variants.map((variant, index) => (
                    <button
                      className={`flex h-20 w-28 flex-col items-center justify-center rounded border bg-transparent text-primary-300 ${selectedVariant === variant ? "border-primary-300 font-semibold text-primary-500" : "border-primary-75 font-normal text-primary-300"} transition-all`}
                      onClick={() => setSelectedVariant(variant)}
                      key={index}
                    >
                      <span className="text-lg">
                        {variant.portionSize.from}/{variant.portionSize.to}
                      </span>
                      <span className="mt-1 text-xs tracking-widest">PERSONS</span>
                    </button>
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

              <div className="flex gap-3">
                <AnimatedButton
                  onClick={() => {
                    if (!user) {
                      navigate("/login");
                      return;
                    }
                    if (!selectedVariant) return;
                    handleAddToCart(currentProduct, selectedVariant, quantity);
                    setQuantity(1);
                  }}
                  disabled={isCartLoading}
                  className="w-full"
                >
                  {isCartLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "ADD TO CART"}
                </AnimatedButton>

                <ChangeQuantitySelection
                  quantity={quantity}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                />
              </div>

              <div className="rounded bg-primary-200 px-5 py-6 text-xs tracking-wider text-primary-50">
                Delivery Methods
                <ul className="ms-2 mt-2 space-y-2">
                  <li>• Collect at the store</li>
                  <li>• Order Before 10PM today and collect tomorrow from 10AM</li>
                </ul>
              </div>

              <div className="mt-4">
                <h6 className="text-2xl font-bold text-[#bd8f68]">Description</h6>
                <p className="mt-2 text-sm tracking-wider">{currentProduct.description}</p>
                <h6 className="mt-2 font-medium text-primary-500">Portion size</h6>
                {currentProduct.variants.map((variant) => (
                  <p className="text-sm tracking-wider" key={variant.size}>
                    {variant.portionSize.from}/{variant.portionSize.to} persons {variant.size}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FullWidthBanner
          webpImage="/images/webp/menu_banner.webp"
          jpegImage="/images/menu_banner.jpg"
        />

        <section className="container mx-auto space-y-6 py-10 lg:space-y-10">
          <div>
            <h2 className="text-center text-2xl text-primary-500 sm:text-3xl sm:leading-[46px]">
              Our recommendations
            </h2>
            <p className="text-center font-light tracking-wider text-primary-300 sm:text-sm lg:text-lg">
              You might also like
            </p>
          </div>

          <RecommendationProducts products={filteredProducts} />
        </section>
      </main>
    );
};

export default ProductDetailPage;

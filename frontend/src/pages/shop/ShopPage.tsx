import { useEffect } from "react";
import CategorySelector from "./components/CategorySelector";
import { useProductStore } from "@/stores/useProductStore";
import { Product } from "@/types";
import ProductCard from "./components/ProductCard";
import ProductItemSkeleton from "@/components/skeletons/ProductItemSkeleton";
import useWindowWidth from "@/hooks/useWindowWidth";
import FullWidthBanner from "@/components/FullWidthBanner";

const ShopPage = () => {
  const windowWidth = useWindowWidth();

  const { products, fetchProducts, isLoading, filteredProducts } = useProductStore();
  const categories = Array.from(new Set(products.flatMap((item) => item.category)));

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="mb-8 space-y-8 text-primary-500">
      <FullWidthBanner
        webpImage="/images/webp/menu_banner.webp"
        jpegImage="/images/menu_banner.jpg"
      />

      <section className="container mx-auto">
        <CategorySelector categories={categories} />

        <div className="flex flex-wrap gap-8 sm:gap-y-10">
          {isLoading ? (
            <div className="grid w-full grid-cols-1 justify-center gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => (
                <ProductItemSkeleton key={index} />
              ))}
            </div>
          ) : (
            filteredProducts
              .reduce<Array<Array<Product>>>((acc, product, index) => {
                // Create a new row every 3 items
                if (index % (windowWidth > 1024 ? 3 : windowWidth > 640 ? 2 : 1) === 0) {
                  acc.push([]); // Start a new row
                }
                acc[acc.length - 1].push(product); // Add the product to the current row
                return acc;
              }, [])
              .map((row, rowIndex) => (
                <div key={rowIndex} className="flex w-full justify-center gap-x-4">
                  {row.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ))
          )}
        </div>
      </section>
    </main>
  );
};

export default ShopPage;

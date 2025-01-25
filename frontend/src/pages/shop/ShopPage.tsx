import { useEffect } from "react";
import CategorySelector from "./components/CategorySelector";
import { useProductStore } from "@/stores/useProductStore";
import { Product } from "@/types";
import ProductCard from "./components/ProductCard";
import ProductItemSkeleton from "@/components/skeletons/ProductItemSkeleton";
import useWindowWidth from "@/hooks/useWindowWidth";

const ShopPage = () => {
  const { products, fetchProducts, isLoading } = useProductStore();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="mb-8 space-y-8 text-primary-500">
      <div
        className="h-[425px] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/images/menu_banner.jpg")' }}
      ></div>

      <section className="container mx-auto">
        <CategorySelector />

        <div className="flex flex-wrap gap-8 sm:gap-y-10">
          {isLoading ? (
            <>
              <div className="flex w-full justify-center gap-x-4">
                <ProductItemSkeleton />
                <ProductItemSkeleton />
                <ProductItemSkeleton />
              </div>
              <div className="flex w-full justify-center gap-x-4">
                <ProductItemSkeleton />
                <ProductItemSkeleton />
                <ProductItemSkeleton />
              </div>
            </>
          ) : (
            products
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

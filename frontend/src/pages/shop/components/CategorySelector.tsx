import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useProductStore } from "@/stores/useProductStore";
import { useEffect, useState } from "react";

const buttonStyle =
  "rounded-[2px] border border-primary-400 bg-transparent text-sm text-primary-400 hover:bg-primary-200 hover:text-primary-50 uppercase";

const CategorySelector = ({ categories }: { categories: string[] }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { fetchProductsByCategory } = useProductStore();

  useEffect(() => {
    if (selectedCategory === "") fetchProductsByCategory([]);
    else fetchProductsByCategory([selectedCategory]);
  }, [fetchProductsByCategory, selectedCategory]);

  return (
    <Carousel
      className="mb-8 flex w-full select-none justify-center py-3"
      opts={{
        dragFree: true,
        loop: false,
      }}
    >
      <CarouselContent className="ml-0 gap-4 sm:gap-6 lg:gap-10">
        <CarouselItem className="flex-shrink-0 basis-auto pl-0">
          <Button
            variant="outline"
            className={`${buttonStyle} ${selectedCategory === "" && "bg-primary-300 text-white"}`}
            onClick={() => setSelectedCategory("")}
          >
            ALL OF PRODUCT
          </Button>
        </CarouselItem>

        {categories.map((category, index) => (
          <CarouselItem key={index} className="flex-shrink-0 basis-auto pl-0">
            <Button
              variant="outline"
              className={`${buttonStyle} ${selectedCategory === category && "bg-primary-300 text-white"}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CategorySelector;

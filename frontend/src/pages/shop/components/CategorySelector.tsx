import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useState } from "react";

const buttonStyle =
  "rounded-[2px] border border-primary-400 bg-transparent text-sm text-primary-400 hover:bg-primary-200 hover:text-primary-50";

const CategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <Carousel className="flex w-full select-none justify-center mb-8 py-3">
      <CarouselContent className="ml-0 gap-10">
        <CarouselItem className="flex-shrink-0 basis-auto pl-0">
          <Button
            variant="outline"
            className={`${buttonStyle} ${selectedCategory === "" && "bg-primary-300 text-white"}`}
            onClick={() => setSelectedCategory("")}
          >
            ALL OF PRODUCT
          </Button>
        </CarouselItem>

        <CarouselItem className="flex-shrink-0 basis-auto pl-0">
          <Button
            variant="outline"
            className={`${buttonStyle} ${selectedCategory === "christmas" && "bg-primary-300 text-white"}`}
            onClick={() => setSelectedCategory("christmas")}
          >
            CHRISTMAS
          </Button>
        </CarouselItem>

        <CarouselItem className="flex-shrink-0 basis-auto pl-0">
          <Button
            variant="outline"
            className={`${buttonStyle} ${selectedCategory === "signature" && "bg-primary-300 text-white"}`}
            onClick={() => setSelectedCategory("signature")}
          >
            SIGNATURE
          </Button>
        </CarouselItem>

        <CarouselItem className="flex-shrink-0 basis-auto pl-0">
          <Button
            variant="outline"
            className={`${buttonStyle} ${selectedCategory === "delicacies" && "bg-primary-300 text-white"}`}
            onClick={() => setSelectedCategory("delicacies")}
          >
            DELICACIES
          </Button>
        </CarouselItem>

        <CarouselItem className="flex-shrink-0 basis-auto pl-0">
          <Button
            variant="outline"
            className={`${buttonStyle} ${selectedCategory === "accessories" && "bg-primary-300 text-white"}`}
            onClick={() => setSelectedCategory("accessories")}
          >
            ACCESSORIES
          </Button>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default CategorySelector;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { NewProduct } from "../AdminCreatePage";

interface VariantComponentProps {
  index: number;
  isAbleToDelete?: boolean;
  onDelete: () => void;
  product: NewProduct;
}

const VariantComponent = ({
  index,
  isAbleToDelete = false,
  onDelete,
  product,
}: VariantComponentProps) => {
  const [toggleSizeType, setToggleSizeType] = useState("cm");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(0);
  const [portionSize, setPortionSize] = useState({ from: 0, to: 0 });

  const handleDelete = () => {
    if (isAbleToDelete) {
      onDelete();
    }
  };

  useEffect(() => {
    setSize(product.variants[index]?.size.split(" ")[0] || "");
    setToggleSizeType(product.variants[index]?.size.split(" ")[1] || "cm");
    setPrice(product.variants[index]?.price || 0);
    setPortionSize(product.variants[index]?.portionSize || { from: 0, to: 0 });
  }, [product, index]);

  return (
    <div className="flex gap-4 font-medium">
      <h6 className="mt-2.5 text-nowrap text-sm">Size {index + 1}</h6>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="relative rounded border border-primary-400 pe-16">
              <Input
                className="border-none"
                placeholder="Size"
                type="size"
                value={size}
                onChange={(e) => {
                  const newSize = e.target.value;
                  setSize(newSize);
                  product.variants[index].size = newSize + " " + toggleSizeType;
                }}
              />
              <button
                type="button"
                className="absolute right-0 top-0 bg-primary-300 p-2 font-medium text-white outline-none"
                onClick={() => setToggleSizeType(toggleSizeType === "cm" ? "pieces" : "cm")}
              >
                {toggleSizeType}
              </button>
            </div>
            <div className="relative rounded border border-primary-400 pe-12">
              <Input
                className="border-none"
                placeholder="Price"
                type="number"
                value={price}
                onChange={(e) => {
                  const newPrice = parseFloat(e.target.value);
                  setPrice(newPrice);
                  product.variants[index].price = isNaN(newPrice) ? 0 : newPrice;
                }}
              />
              <div className="absolute right-0 top-0 bg-primary-300 p-2 font-medium text-white">
                CHF
              </div>
            </div>
          </div>

          <div className="relative flex justify-center rounded border border-primary-400 pe-20">
            <div className="p-2 font-medium">from</div>
            <Input
              className="w-5 border-none p-0 text-center text-xl font-medium underline underline-offset-2"
              placeholder="*"
              type="number"
              max={10}
              min={1}
              value={portionSize.from}
              onChange={(e) => {
                const newPortions = parseInt(e.target.value);
                setPortionSize({ ...portionSize, from: newPortions });
                product.variants[index].portionSize.from = isNaN(newPortions) ? 0 : newPortions;
              }}
            />
            <div className="p-2 font-medium">to</div>

            <Input
              className="w-5 border-none p-0 text-center text-xl font-medium underline underline-offset-2"
              placeholder="*"
              type="number"
              max={10}
              min={1}
              value={product.variants[index].portionSize.to || ""}
              onChange={(e) => {
                const newPortions = parseInt(e.target.value);
                setPortionSize({ ...portionSize, to: newPortions });
                product.variants[index].portionSize.to = isNaN(newPortions) ? 0 : newPortions;
              }}
            />
            <div className="absolute right-0 top-0 bg-primary-300 p-2 font-medium text-white">
              portions
            </div>
          </div>
        </div>
      </div>

      <Button
        type="button"
        onClick={handleDelete}
        className={`h-fit self-center border border-primary-400 bg-primary-300 px-2 hover:bg-primary-400 ${!isAbleToDelete && "invisible"}`}
      >
        <Trash2 />
      </Button>
    </div>
  );
};

export default VariantComponent;

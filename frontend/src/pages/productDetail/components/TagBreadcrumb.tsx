import { Product } from "@/types";

const TagBreadcrumb = ({ product }: { product: Product }) => {
  return (
    <div className="flex items-center text-sm tracking-wider text-[#73573F]">
      <a href={"/shop"}>Shop</a>
      {product.category.map((c_, index) => (
        <div className="flex items-center" key={index}>
          <div className="mx-2 h-3 border-l border-[#73573F]"></div>
          <a href={`/shop`} className="capitalize">
            {c_}
          </a>
        </div>
      ))}
      <div className="mx-2 h-3 border-l border-[#73573F]"></div>
      <a href={`/shop`} className="capitalize">
        {product.name}
      </a>
    </div>
  );
};

export default TagBreadcrumb;

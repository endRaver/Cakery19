import { Product } from "@/types";
import { Link } from "react-router-dom";

const TagBreadcrumb = ({ product }: { product: Product }) => {
  return (
    <div className="flex items-center text-sm tracking-wider text-[#73573F]">
      <Link to={"/shop"}>Shop</Link>
      {product.category.map((c_, index) => (
        <div className="flex items-center" key={index}>
          <div className="mx-2 h-3 border-l border-[#73573F]"></div>
          <Link to={`/shop`} className="capitalize">
            {c_}
          </Link>
        </div>
      ))}
      <div className="mx-2 h-3 border-l border-[#73573F]"></div>
      <Link to={`/shop`} className="capitalize">
        {product.name}
      </Link>
    </div>
  );
};

export default TagBreadcrumb;

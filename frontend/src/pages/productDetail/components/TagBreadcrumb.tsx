import { Product } from "@/types";
import { Link, useNavigate } from "react-router-dom";

const textStyle = "border-b border-transparent capitalize duration-300 hover:border-[#73573F]";

const TagBreadcrumb = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  const handleNavigate = (c_: string) => {
    navigate(`/shop?category=${c_}`);
  };

  return (
    <div className="flex items-center text-sm tracking-wider text-[#73573F]">
      <Link to={"/shop"} className={`${textStyle}`}>
        Shop
      </Link>
      {product.category.map((c_, index) => (
        <div className="flex items-center" key={index}>
          <div className="mx-2 h-3 border-l border-[#73573F]"></div>
          <button className={`${textStyle}`} onClick={() => handleNavigate(c_)}>
            {c_}
          </button>
        </div>
      ))}
      <div className="mx-2 h-3 border-l border-[#73573F]"></div>
      <button className={`${textStyle}`}>{product.name}</button>
    </div>
  );
};

export default TagBreadcrumb;

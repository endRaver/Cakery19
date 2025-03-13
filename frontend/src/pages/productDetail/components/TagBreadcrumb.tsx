import AnimatedUnderline from "@/pages/shopping-cart/components/AnimationUnderline";
import { Product } from "@/types";
import { Link, useNavigate } from "react-router-dom";

const TagBreadcrumb = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  const handleNavigate = (c_: string) => {
    navigate(`/shop?category=${c_}`);
  };

  return (
    <div className="flex items-center text-sm tracking-wider text-primary-400">
      <AnimatedUnderline>
        <Link to={"/shop"} className="capitalize">
          Shop
        </Link>
      </AnimatedUnderline>
      {product.category.map((c_, index) => (
        <div className="flex items-center" key={index}>
          <div className="mx-2 h-3 border-l border-primary-400" />
          <AnimatedUnderline>
            <button className="capitalize" onClick={() => handleNavigate(c_)}>
              {c_}
            </button>
          </AnimatedUnderline>
        </div>
      ))}
      <div className="mx-2 h-3 border-l border-primary-400" />
      <AnimatedUnderline>
        <button className="capitalize">{product.name}</button>
      </AnimatedUnderline>
    </div>
  );
};

export default TagBreadcrumb;

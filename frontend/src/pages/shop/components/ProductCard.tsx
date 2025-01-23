import { Product } from "@/types";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link to={`/shop/${product._id}`}>
      <div className="group relative flex-1 lg:max-w-[309px] xl:max-w-[373px] 2xl:max-w-[448px]">
        <div className="relative h-[380px] w-full overflow-hidden">
          <div className="absolute top-[200px] z-20 h-[180px] w-full bg-gradient-to-t from-black/80 to-transparent opacity-0 duration-500 ease-in-out group-hover:opacity-100"></div>
          <div
            className="absolute top-0 h-full w-full bg-cover bg-center bg-no-repeat duration-500 ease-in-out group-hover:scale-110"
            style={{
              backgroundImage: `url("${product.imageUrl[1] ? product.imageUrl[1] : product.imageUrl[0]}")`,
            }}
          ></div>
          <div
            className="absolute top-0 h-full w-full bg-cover bg-center bg-no-repeat duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-0"
            style={{ backgroundImage: `url("${product.imageUrl[0]}")` }}
          ></div>
        </div>
        <div className="absolute bottom-0 left-0 z-30 text-sm duration-500 ease-in-out group-hover:bottom-16 group-hover:left-5 group-hover:text-primary-50">
          <h4 className="font-medium uppercase tracking-wider">{product.name}</h4>
          <p className="italic">From {product.variants[0].price.toFixed(2)} CHF</p>
        </div>

        <p className="mt-2 text-sm tracking-wider opacity-0 duration-500 ease-in-out group-hover:opacity-100">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;

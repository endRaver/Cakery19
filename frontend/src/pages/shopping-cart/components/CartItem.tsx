import ChangeQuantitySelection from "@/components/ChangeQuantitySelection";
import { useProductStore } from "@/stores/useProductStore";
import { CartProduct } from "@/types";

const CartItem = ({ cartProduct }: { cartProduct: CartProduct }) => {
  const { handleUpdateProductFromCart, handleDeleteProductFromCart } = useProductStore();

  const handleIncrement = () => {
    if (cartProduct.quantity >= 9) return;
    handleUpdateProductFromCart(cartProduct.product, 1, cartProduct.variant);
  };

  const handleDecrement = () => {
    if (cartProduct.quantity <= 1) {
      handleRemoveItem();
    } else {
      handleUpdateProductFromCart(cartProduct.product, -1, cartProduct.variant);
    }
  };

  const handleRemoveItem = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this item from the cart?"
    );
    if (confirmDelete) {
      handleDeleteProductFromCart(cartProduct.product, cartProduct.variant);
    }
  };

  return (
    <div className="flex justify-between border-b border-primary-75 py-8">
      <div className="flex items-center gap-10">
        <picture>
          <source srcSet={cartProduct.product.imageUrl[0]} type="image/webp" />
          <img
            src={cartProduct.product.imageUrl[0]}
            alt={cartProduct.product.name}
            loading="eager"
            className="fade-in-image aspect-square h-28 object-cover object-center"
            onLoad={(e) => (e.target as HTMLImageElement).classList.add("loaded")}
          />
        </picture>

        <div className="w-[200px] space-y-1">
          <h3 className="text-xl font-medium uppercase text-primary-400">
            {cartProduct.product.name}
          </h3>
          <p className="uppercase text-primary-200">Type: {cartProduct.variant?.size}</p>
          <p className="font-xl uppercase text-primary-400">
            {cartProduct.variant?.price.toFixed(2)} CHF
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium tracking-widest text-primary-400">QUANTITY:</span>

        <ChangeQuantitySelection
          quantity={cartProduct.quantity}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      </div>

      <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-primary-400">
        <span>TOTAL:</span>
        <span className="w-28 text-nowrap">
          {(cartProduct.quantity * (cartProduct.variant?.price ?? 0)).toFixed(2)} CHF
        </span>
      </div>

      <div className="flex items-center">
        <button
          className="relative flex h-4 w-4 rotate-45 rounded-full border border-primary-100 p-5"
          onClick={handleRemoveItem}
        >
          <span className="absolute left-1/2 top-1/2 block h-[1px] w-3.5 -translate-x-1/2 -translate-y-1/2 bg-primary-300" />
          <span className="absolute left-1/2 top-1/2 block h-[1px] w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-90 bg-primary-300" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

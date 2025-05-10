import axiosInstance from "@/lib/axios";
import { CartProduct, Product, Variant } from "@/types/product";
import { AxiosError } from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";
import { CacheManager } from "@/lib/cache";

interface CartStore {
  isLoading: boolean;
  cartItems: CartProduct[];
  pickupDate: string;

  cartCache: CacheManager<CartProduct[]>;

  handleGetCartItems: () => Promise<CartProduct[]>;
  handleAddToCart: (
    product: Product,
    variant: Variant,
    quantity?: number,
    excludeNuts?: boolean
  ) => Promise<void>;
  handleRemoveFromCart: (cartProduct: CartProduct) => Promise<void>;
  handleUpdateQuantity: (cartProduct: CartProduct, quantity: number) => Promise<void>;
  setPickupDate: (date: string) => void;
  resetCache: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  isLoading: false,
  cartItems: [],
  pickupDate: "",

  cartCache: new CacheManager<CartProduct[]>(),

  handleGetCartItems: async () => {
    const cacheKey = "cart";
    const cache = get().cartCache;

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      set({ cartItems: cachedData });
      return cachedData;
    }

    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/carts");

      set({ cartItems: response.data });
      get().cartCache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      set({ cartItems: [] });
      if (error instanceof AxiosError) {
        console.log(error.response?.data?.message);
      }
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  handleAddToCart: async (
    product: Product,
    variant: Variant,
    quantity?: number,
    excludeNuts?: boolean
  ) => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.post("/carts", {
        productId: product._id,
        variant: variant,
        quantity: quantity ?? 1,
        excludeNuts: excludeNuts ?? false,
      });

      get().resetCache();
      set((prevState) => {
        const newCart = [...prevState.cartItems, response.data];
        return { cartItems: newCart };
      });

      toast.success("Product added to cart");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message ?? "Failed to add product to cart");
      }
    } finally {
      set({ isLoading: false });
    }
  },

  handleRemoveFromCart: async (cartProduct: CartProduct) => {
    set({ isLoading: true });

    try {
      await axiosInstance.delete(`/carts`, {
        data: {
          productId: cartProduct.product._id,
          variant: cartProduct.variant,
          excludeNuts: cartProduct.excludeNuts,
        },
      });

      get().resetCache();
      set((prevState) => {
        const newCart = prevState.cartItems.filter(
          (item) =>
            !(
              item.product._id === cartProduct.product._id &&
              item.variant.size === cartProduct.variant.size &&
              item.excludeNuts === cartProduct.excludeNuts
            )
        );
        return { cartItems: newCart };
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message ?? "Failed to remove product from cart");
      }
    } finally {
      set({ isLoading: false });
    }
  },

  handleUpdateQuantity: async (cartProduct: CartProduct, quantity: number) => {
    try {
      await axiosInstance.put(`/carts/${cartProduct.product._id}`, {
        quantity,
        variant: cartProduct.variant,
        excludeNuts: cartProduct.excludeNuts,
      });

      get().resetCache();
      set((prevState) => {
        const newCart = prevState.cartItems.map((item) =>
          item.product._id === cartProduct.product._id &&
          item.variant.size === cartProduct.variant.size &&
          item.excludeNuts === cartProduct.excludeNuts
            ? { ...item, quantity }
            : item
        );
        return { cartItems: newCart };
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message ?? "Failed to update quantity");
      }
    }
  },

  setPickupDate: (date: string) => {
    set({ pickupDate: date });
  },

  resetCache: () => {
    get().cartCache.clear();
  },
}));

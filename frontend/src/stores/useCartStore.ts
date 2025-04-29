import axiosInstance from "@/lib/axios";
import { CartItem, Product, Variant } from "@/types/product";
import { AxiosError } from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";
import { CacheManager } from "@/lib/cache";

interface CartStore {
  isLoading: boolean;
  cartItems: CartItem[];

  cartCache: CacheManager<CartItem[]>;

  handleGetCartItems: () => Promise<CartItem[]>;
  handleAddToCart: (product: Product, variant: Variant, quantity?: number) => Promise<void>;
  handleRemoveFromCart: (productId: string) => Promise<void>;
  handleUpdateQuantity: (productId: string, quantity: number) => Promise<void>;
  resetCache: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  isLoading: false,
  cartItems: [],

  cartCache: new CacheManager<CartItem[]>(),

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

  handleAddToCart: async (product: Product, variant: Variant, quantity?: number) => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.post("/carts", {
        productId: product._id,
        variant: variant,
        quantity: quantity ?? 1,
      });

      set((prevState) => {
        const newCart = [...prevState.cartItems, response.data];
        return { cartItems: newCart };
      });

      await get().handleGetCartItems();
      get().resetCache();
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

  handleRemoveFromCart: async (productId: string) => {
    set({ isLoading: true });

    try {
      await axiosInstance.delete(`/carts`, { data: { productId } });

      set((prevState) => {
        const newCart = prevState.cartItems.filter((item) => item.product._id !== productId);
        return { cartItems: newCart };
      });

      get().resetCache();
      toast.success("Product removed from cart");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message ?? "Failed to remove product from cart");
      }
    } finally {
      set({ isLoading: false });
    }
  },

  handleUpdateQuantity: async (productId: string, quantity: number) => {
    try {
      await axiosInstance.put(`/carts/${productId}`, { quantity });

      get().resetCache();

      set((prevState) => {
        const newCart = prevState.cartItems.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item
        );
        return { cartItems: newCart };
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message ?? "Failed to update quantity");
      }
    }
  },

  resetCache: () => {
    get().cartCache.clear();
  },
}));

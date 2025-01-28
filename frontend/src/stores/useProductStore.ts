import { axiosInstance } from "@/lib/axios";
import { Product } from "@/types";
import { create } from "zustand";
import toast from "react-hot-toast";

interface ProductStore {
  currentProduct: Product | null;
  products: Product[];
  isLoading: boolean;
  error: string | null;
  filteredProducts: Product[];

  fetchProducts: () => Promise<void>;
  fetchProductsById: (id: string) => Promise<void>;
  fetchProductsByCategory: (category: string[], amount?: number) => Promise<void>;
  createProduct: (data: unknown) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  currentProduct: null,
  products: [],
  filteredProducts: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/products");
      set({ products: response.data });
    } catch (error: unknown) {
      const err = error as { response: { data: { message: string } } };
      set({ error: err.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProductsById: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get(`/products/${id}`);
      set({ currentProduct: response.data });
    } catch (error: unknown) {
      const err = error as { response: { data: { message: string } } };
      set({ error: err.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProductsByCategory: async (categories: string[], amount = 0) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.post(
        `/products/category`,
        { categories, amount },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      set({ filteredProducts: response.data });
    } catch (error: unknown) {
      const err = error as { response: { data: { message: string } } };
      set({ error: err.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  createProduct: async (data) => {
    set({ isLoading: true, error: null });

    try {
      await axiosInstance.post("/admin/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product created successfully");
    } catch (error: unknown) {
      const err = error as { response: { data: { message: string } } };
      set({ error: err.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

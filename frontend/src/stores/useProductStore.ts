import { axiosInstance } from "@/lib/axios";
import { Product } from "@/types";
import { create } from "zustand";

interface ProductStore {
  currentProduct: Product | null;
  products: Product[];
  isLoading: boolean;
  error: string | null;
  signatureProducts: Product[];

  fetchProducts: () => Promise<void>;
  fetchProductsById: (id: string) => Promise<void>;
  fetchSignatureProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  currentProduct: null,
  products: [],
  signatureProducts: [],
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

  fetchSignatureProducts: async () => {
    try {
      const response = await axiosInstance.get("/products/signature");
      set({ signatureProducts: response.data });
    } catch (error: unknown) {
      const err = error as { response: { data: { message: string } } };
      set({ error: err.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

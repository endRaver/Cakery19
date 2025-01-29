import { axiosInstance } from "@/lib/axios";
import { Product } from "@/types";
import { create } from "zustand";
import toast from "react-hot-toast";

interface ProductStore {
  isLoading: boolean;
  isDeleting: boolean;
  currentProduct: Product | null;
  deletedProduct: Product | null;
  products: Product[];
  error: string | null;
  filteredProducts: Product[];

  fetchProducts: () => Promise<void>;
  fetchProductsById: (id: string) => Promise<void>;
  fetchProductsByCategory: (category: string[], amount?: number) => Promise<void>;
  handleCreateProduct: (data: unknown) => Promise<void>;
  handleUpdateProduct: (id: string, data: unknown) => Promise<void>;
  handleDeleteProduct: (product: Product) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  isLoading: false,
  isDeleting: false,
  currentProduct: null,
  deletedProduct: null,
  products: [],
  filteredProducts: [],
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

  handleCreateProduct: async (data) => {
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

  handleUpdateProduct: async (id, data) => {
    set({ isLoading: true, error: null });

    try {
      await axiosInstance.put(`/admin/products/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product updated successfully");
    } catch (error: unknown) {
      const err = error as { response: { data: { message: string } } };
      set({ error: err.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  handleDeleteProduct: async (product) => {
    set({ isDeleting: true, error: null });

    try {
      const confirm = window.confirm("Are you sure you want to delete this product?");
      if (!confirm) return;

      const response = await axiosInstance.delete(`/admin/products/${product._id}`, {
        data: product,
        headers: {
          "Content-Type": "application/json",
        },
      });
      set({ deletedProduct: response.data });

      set((state) => ({
        products: state.products.filter((p) => p._id !== product._id),
      }));

      toast.success("Product deleted successfully");
    } catch (error: unknown) {
      const err = error as { response: { data: { message: string } } };
      set({ error: err.response.data.message });
    } finally {
      set({ isDeleting: false });
    }
  },
}));

import { axiosInstance } from "@/lib/axios";
import { CartProduct, Product, Variant } from "@/types";
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
  cartProducts: CartProduct[];

  fetchProducts: () => Promise<void>;
  fetchProductsById: (id: string) => Promise<void>;
  fetchProductsByCategory: (category: string[], amount?: number) => Promise<void>;
  handleCreateProduct: (data: unknown) => Promise<void>;
  handleUpdateProduct: (id: string, data: unknown) => Promise<void>;
  handleDeleteProduct: (product: Product) => Promise<void>;
  handleSetCartProducts: () => void;
  handleUpdateProductFromCart: (
    product: Product,
    quantity: number,
    selectedVariant: Variant | undefined
  ) => void;
  handleDeleteProductFromCart: (product: Product, variant: Variant | undefined) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  isLoading: false,
  isDeleting: false,
  currentProduct: null,
  deletedProduct: null,
  products: [],
  filteredProducts: [],
  cartProducts: [],
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

  handleSetCartProducts: () => {
    const savedCart = localStorage.getItem("cartProducts");

    if (savedCart) {
      set({ cartProducts: JSON.parse(savedCart) });
    }
  },

  handleUpdateProductFromCart: (product, quantity, selectedVariant) => {
    set((state) => {
      const existingCartItemIndex = state.cartProducts.findIndex(
        (item) => item.product._id === product._id && item.variant?.size === selectedVariant?.size
      );

      let updatedCartProducts;

      if (existingCartItemIndex !== -1) {
        // If the product already exists, update the quantity
        const existingCartItem = state.cartProducts[existingCartItemIndex];
        updatedCartProducts = [
          ...state.cartProducts.slice(0, existingCartItemIndex),
          {
            ...existingCartItem,
            quantity: existingCartItem.quantity + quantity, // Increment the quantity
          },
          ...state.cartProducts.slice(existingCartItemIndex + 1),
        ];
      } else {
        // If the product does not exist, add it to the cart
        updatedCartProducts = [
          ...state.cartProducts,
          { product: product, quantity: quantity, variant: selectedVariant },
        ];
      }

      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));

      return { cartProducts: updatedCartProducts };
    });
  },

  handleDeleteProductFromCart: (product, selectedVariant) => {
    set((state) => {
      const updatedCartProducts = state.cartProducts.filter(
        (item) => item.product._id !== product._id || item.variant?.size !== selectedVariant?.size
      );

      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
      return { cartProducts: updatedCartProducts };
    });
  },
}));

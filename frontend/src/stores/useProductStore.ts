import { axiosInstance } from "@/lib/axios";
import { CartProduct, Product } from "@/types/product";
import { create } from "zustand";
import toast from "react-hot-toast";
import { CacheManager } from "@/lib/cache";

interface ProductStore {
  isLoading: boolean;
  isDeleting: boolean;
  currentProduct: Product | null;
  deletedProduct: Product | null;
  products: Product[];
  error: string | null;
  filteredProducts: Product[];
  cartProducts: CartProduct[];

  productsCache: CacheManager<Product[]>;
  currentProductCache: CacheManager<Product>;
  filteredProductsCache: CacheManager<Product[]>;
  deletedProductCache: CacheManager<Product>;

  fetchProducts: () => Promise<void>;
  fetchProductsById: (id: string) => Promise<void>;
  fetchProductsByCategory: (category: string[], amount?: number) => Promise<void>;
  handleCreateProduct: (data: unknown) => Promise<void>;
  handleUpdateProduct: (id: string, data: unknown) => Promise<void>;
  handleDeleteProduct: (product: Product) => Promise<void>;

  resetCache: () => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  isLoading: false,
  isDeleting: false,
  currentProduct: null,
  deletedProduct: null,
  products: [],
  filteredProducts: [],
  cartProducts: [],
  error: null,

  productsCache: new CacheManager<Product[]>(),
  currentProductCache: new CacheManager<Product>(),
  filteredProductsCache: new CacheManager<Product[]>(),
  deletedProductCache: new CacheManager<Product>(),

  fetchProducts: async () => {
    const cachedKey = "get_products";
    const cachedData = get().productsCache.get(cachedKey);

    if (cachedData) {
      set({ products: cachedData });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/products");
      set({ products: response.data });
      get().productsCache.set(cachedKey, response.data);
    } catch (error: unknown) {
      const err = error as { response: { data: { message: string } } };
      set({ error: err.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProductsById: async (id: string) => {
    const cachedKey = `get_product_by_id_${id}`;
    const cachedData = get().currentProductCache.get(cachedKey);

    if (cachedData) {
      set({ currentProduct: cachedData });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get(`/products/${id}`);
      set({ currentProduct: response.data });
      get().currentProductCache.set(cachedKey, response.data);
    } catch (error: unknown) {
      const err = error as { response: { data: { message: string } } };
      set({ error: err.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProductsByCategory: async (categories: string[], amount = 0) => {
    const cachedKey = `get_products_by_category_${categories.join("_")}_${amount}`;
    const cachedData = get().filteredProductsCache.get(cachedKey);

    if (cachedData) {
      set({ filteredProducts: cachedData });
      return;
    }

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
      get().filteredProductsCache.set(cachedKey, response.data);
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
      get().resetCache();
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
      get().resetCache();
    } catch (error: unknown) {
      const err = error as { response: { data: { message: string } } };
      set({ error: err.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  handleDeleteProduct: async (product) => {
    const cachedKey = `get_deleted_product_${product._id}`;
    const cachedData = get().deletedProductCache.get(cachedKey);

    if (cachedData) {
      set({ deletedProduct: cachedData });
      return;
    }

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
      get().deletedProductCache.set(cachedKey, response.data);

      set((state) => ({
        products: state.products.filter((p) => p._id !== product._id),
      }));
      get().resetCache();

      toast.success("Product deleted successfully");
    } catch (error: unknown) {
      const err = error as { response: { data: { message: string } } };
      set({ error: err.response.data.message });
    } finally {
      set({ isDeleting: false });
    }
  },

  resetCache: () => {
    get().productsCache.clear();
    get().currentProductCache.clear();
    get().filteredProductsCache.clear();
    get().deletedProductCache.clear();
  },
}));

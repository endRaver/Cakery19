import { CartProduct } from "./product";

export type Order = {
  _id: string;
  orderNumber: string;
  products: CartProduct[];
  status: string;
  totalAmount: number;
  pickupDate: string;
  createdAt?: string;
  updatedAt?: string;
};

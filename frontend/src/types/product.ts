interface PortionSize {
  from: number;
  to: number;
}

export interface Variant {
  size: string;
  price: number;
  portionSize: PortionSize;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string[];
  variants: Variant[];
  imageUrl: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CartProduct {
  product: Product;
  quantity: number;
  variant?: Variant;
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  content: {
    text: string;
    images: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant: Variant;
}

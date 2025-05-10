interface PortionSize {
  from: number;
  to: number;
}

export interface Variant {
  size: string;
  price: number;
  portionSize: PortionSize;
  excludeNuts: boolean;
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
  variant: Variant;
  excludeNuts: boolean;
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

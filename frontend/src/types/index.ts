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

export interface User {
  _id: string;
  clerkId: string;
  fullname: string;
  imageUrl: string;
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}


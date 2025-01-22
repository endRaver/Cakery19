interface PortionSize {
  from: number;
  to: number;
}

interface Variant {
  size: number;
  price: number;
  portionSize: PortionSize;
}

export interface Product {
  _id: string;
  name: string;
  variants: Variant[];
  description: string;
  category: string[];
  imageUrl: string[];
  signature: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  _id: string;
  clerkId: string;
  fullname: string;
  imageUrl: string;
}

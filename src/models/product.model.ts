
export interface ProductSpecs {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  images?: string[]; // Multiple product views
  rating: number;
  stock: number;
  specs?: ProductSpecs; // Technical specifications
}

export interface CartItem extends Product {
  quantity: number;
}

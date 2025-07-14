// dashboard sidebar menu
export type MenuKey = 'products' | 'brands' | 'categories';

// auth
export interface AuthResponse {
  name?: string;
  token: string;
  message: string;
}

// product type

export interface ProductType {
  _id: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  discount: number;
  images: string[];
  categoryId: string;
  brandId: string;
}

// categories
export interface CategoriesType {
  _id: string;
  name: string;
  image: string;
}

// dashboard sidebar menu
export type MenuKey = 'products' | 'brands' | 'categories';

// auth
export interface AuthResponse {
  name?: string;
  token: string;
  message: string;
}

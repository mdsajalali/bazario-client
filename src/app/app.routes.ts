import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { BrandsComponent } from './pages/admin/brands/brands.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { HomeComponent } from './pages/home/home.component';
import { OrdersComponent } from './pages/admin/orders/orders.component';
import { AddBrandComponent } from './pages/admin/add-brand/add-brand.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { UpdateBrandComponent } from './pages/admin/update-brand/update-brand.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { UpdateProductComponent } from './pages/admin/update-product/update-product.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { SearchComponent } from './pages/search/search.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'dashboard/products',
        component: ProductsComponent,
      },
      {
        path: 'dashboard/add-product',
        component: AddProductComponent,
      },
      {
        path: 'dashboard/product/edit/:id',
        component: UpdateProductComponent,
      },
      {
        path: 'dashboard/brands',
        component: BrandsComponent,
      },
      {
        path: 'dashboard/add-brand',
        component: AddBrandComponent,
      },
      {
        path: 'dashboard/brand/edit/:id',
        component: UpdateBrandComponent,
      },
      {
        path: 'dashboard/categories',
        component: CategoriesComponent,
      },
      {
        path: 'dashboard/add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'dashboard/category/edit/:id',
        component: UpdateCategoryComponent,
      },

      {
        path: 'dashboard/orders',
        component: OrdersComponent,
      },
    ],
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'blogs',
    component: BlogsComponent,
  },
  {
    path: 'blogs/:id',
    component: BlogDetailsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

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
        path: 'dashboard/brands',
        component: BrandsComponent,
      },
      {
        path: 'dashboard/add-brand',
        component: AddBrandComponent,
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
        path: 'dashboard/products',
        component: ProductsComponent,
      },
      {
        path: 'dashboard/add-product',
        component: AddProductComponent,
      },
      {
        path: 'dashboard/orders',
        component: OrdersComponent,
      },
    ],
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

import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/shared/header/header.component";
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { BannerComponent } from "../../components/banner/banner.component";
import { ShopCategoryComponent } from "../../components/shop-category/shop-category.component";
import { FeaturedProductsComponent } from "../../components/featured-products/featured-products.component";
import { RecentProductsComponent } from "../../components/recent-products/recent-products.component";
import { ShopBrandsComponent } from "../../components/shop-brands/shop-brands.component";
import { HomeProductsComponent } from "../../components/home-products/home-products.component";
import { HomeBlogsComponent } from '../../components/home-blogs/home-blogs.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, BannerComponent, ShopCategoryComponent, FeaturedProductsComponent, RecentProductsComponent, ShopBrandsComponent, HomeBlogsComponent, HomeProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

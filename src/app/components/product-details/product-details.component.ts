import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RecentProductsComponent } from '../recent-products/recent-products.component';
import { ProductType } from '../../types';
import { ProductsService } from '../../services/products/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [HeaderComponent, FooterComponent, RecentProductsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product!: ProductType;
  productService = inject(ProductsService);
  route = inject(ActivatedRoute);
  loading: boolean = true;
  selectedImage: string = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (product) => {
          this.product = product;
          if (this.product.images && this.product.images.length > 0) {
            this.selectedImage = this.product.images[0];
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching product:', err);
          this.loading = false;
        },
      });
    }
  }

  getImage(image: string) {
    this.selectedImage = image;
    console.log(image);
  }
}

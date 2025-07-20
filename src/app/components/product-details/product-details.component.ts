import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RecentProductsComponent } from '../recent-products/recent-products.component';
import { ProductType } from '../../types';
import { ProductsService } from '../../services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { Carousel, CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { WishlistService } from '../../services/wishlist.service';
import { CartsService } from '../../services/carts/carts.service';

@Component({
  selector: 'app-product-details',
  imports: [
    HeaderComponent,
    FooterComponent,
    RecentProductsComponent,
    Carousel,
    CarouselModule,
    CommonModule,
    Button,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product!: ProductType;
  productService = inject(ProductsService);
  route = inject(ActivatedRoute);
  cartService = inject(CartsService);
  wishlistService = inject(WishlistService);

  loading: boolean = true;
  selectedImage: string = '';
  isWishlisted: boolean = false;
  quantityInCart: number = 0;

  ngOnInit() {
    this.checkWishlistStatus();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (product) => {
          this.product = product;
          if (product.images?.length) {
            this.selectedImage = product.images[0];
          }
          this.getCartQuantity(product._id!);

          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching product:', err);
          this.loading = false;
        },
      });
    }
  }

  checkWishlistStatus() {
    this.wishlistService.getWishlists().subscribe({
      next: (wishlist: any) => {
        this.isWishlisted = wishlist.some(
          (item: any) => item._id === this.product._id
        );
      },
    });
  }

  toggleWishlist(id: string) {
    if (this.isWishlisted) {
      this.removeToWishlist(id);
    } else {
      this.addToWishlist(id);
    }
  }

  addToWishlist(id: string) {
    this.wishlistService.addToWishlist(id).subscribe({
      next: () => {
        this.checkWishlistStatus();

        this.wishlistService.updateWishlistCount();  
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  removeToWishlist(id: string) {
    this.wishlistService.removeToWishlist(id).subscribe({
      next: () => {
        this.checkWishlistStatus();

        this.wishlistService.updateWishlistCount();  
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getCartQuantity(productId: string) {
    this.cartService.getCartItems().subscribe({
      next: (items: any) => {
        const item = items.find((i: any) => i.product._id === productId);
        this.quantityInCart = item ? item.quantity : 0;
      },
    });
  }

  increaseQty() {
    if (this.product) {
      this.cartService.addToCart(this.product._id!, 1).subscribe(() => {
        this.quantityInCart++;
        this.cartService.init(); 
        this.cartService.updateCartCount();  
      });
    }
  }

  decreaseQty() {
    if (this.quantityInCart > 1) {
      this.cartService.addToCart(this.product._id!, -1).subscribe(() => {
        this.quantityInCart--;
        this.cartService.init(); 
        this.cartService.updateCartCount();  
      });
    } else {
      this.cartService.removeFormCart(this.product._id!).subscribe(() => {
        this.quantityInCart = 0;
        this.cartService.init(); 
        this.cartService.updateCartCount();  
      });
    }
  }

  addToCart() {
    this.cartService.addToCart(this.product._id!, 1).subscribe(() => {
      this.quantityInCart = 1;
      this.cartService.init(); 
      this.cartService.updateCartCount();  
    });
  }

  getImage(image: string) {
    this.selectedImage = image;
    console.log(image);
  }

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 2,
      numScroll: 1,
    },
  ];
}

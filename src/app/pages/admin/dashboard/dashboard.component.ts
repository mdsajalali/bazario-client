import {
  ChangeDetectorRef,
  Component,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { OrdersComponent } from '../orders/orders.component';
import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';
import { ProductsService } from '../../../services/dashboard/products/products.service';

@Component({
  selector: 'app-dashboard',
  imports: [OrdersComponent, ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  basicData: any;
  basicOptions: any;

  platformId = inject(PLATFORM_ID);
  productService = inject(ProductsService);

  constructor(private cd: ChangeDetectorRef) {}

  totalProducts: number = 0;
  totalBrands: number = 0;
  totalCategories: number = 0;
  totalOrders: number = 0;
  ngOnInit() {
    this.productService.getOverview().subscribe({
      next: (result: any) => {
        this.totalProducts = result.totalProducts;
        this.totalBrands = result.totalBrands;
        this.totalCategories = result.totalCategories;
        this.totalOrders = result.totalOrders;

        this.initChart();

        this.cd.markForCheck();
      },
    });
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor =
        documentStyle.getPropertyValue('--p-text-color') || '#495057';
      const textColorSecondary =
        documentStyle.getPropertyValue('--p-text-muted-color') || '#6c757d';
      const surfaceBorder =
        documentStyle.getPropertyValue('--p-content-border-color') || '#dee2e6';

      this.basicData = {
        labels: ['Total Orders'],
        datasets: [
          {
            label: 'Orders',
            data: [this.totalOrders],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
          },
        ],
      };

      this.basicOptions = {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
    }
  }
}

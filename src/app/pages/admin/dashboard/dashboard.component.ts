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
    this.initChart();
    this.productService.getOverview().subscribe({
      next: (result: any) => {
        this.totalProducts = result.totalProducts;
        this.totalBrands = result.totalBrands;
        this.totalCategories = result.totalCategories;
        this.totalOrders = result.totalOrders;
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
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Sales',
            data: [8500, 7200, 9100, 10600],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
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

      this.cd.markForCheck();
    }
  }
}

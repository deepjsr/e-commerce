import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css',
})
export class SellerDashboardComponent implements OnInit {
  ordered_deshboard_data: any;
  total_order: any;
  last_order_date: any;
  product_dashboard_data: any;
  total_product: number = 0;
  published_product: number = 0;
  inactive_product: number = 0;
  draft_product: number = 0;
  constructor(
    private _customerService: CustomerService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.sellerOrderDashboardData(), this.sellerProductDashboardData();
  }
  sellerProductDeshboard() {
    this._router.navigateByUrl('/seller/product');
  }

  sellerOrderDeshboard() {
    alert('This option only for admin....');
  }
  sellerOrderDashboardData() {
    this._customerService.orderDashBoardData().subscribe(
      (data) => {
        this.ordered_deshboard_data = data;
        console.log(this.ordered_deshboard_data, 'Order Dashboard data');
        this.total_order = Number(this.ordered_deshboard_data.length);
        this.last_order_date =
          this.ordered_deshboard_data[this.total_order - 1].date;
      },
      (error) => {
        console.error('Error on seller dash board data', error);
      }
    );
  }
  sellerProductDashboardData() {
    this._customerService.productDashboardData().subscribe(
      (data) => {
        console.log('sellers status', data);

        this.product_dashboard_data = data;
        for (const status in this.product_dashboard_data) {
          if (this.product_dashboard_data[status].status === 'publish') {
            ++this.published_product;
          } else if (
            this.product_dashboard_data[status].status === 'inactive'
          ) {
            ++this.inactive_product;
          } else if (this.product_dashboard_data[status].status === 'draft') {
            ++this.draft_product;
            ++this.total_product;
          } else {
          }
        }
      },
      (error) => {
        console.log('Error in product dashboard data', error);
      }
    );
  }
}

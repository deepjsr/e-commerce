import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css',
})
export class BuyerDashboardComponent implements OnInit {
  all_products: any;
  show_checkout: boolean = false;
  constructor(
    private _router: Router,
    private _customerService: CustomerService
  ) {}
  ngOnInit(): void {
    this.getAllProduct();
  }
  getAllProduct() {
    this._customerService.allProduct().subscribe(
      (data) => {
        this.all_products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }
  buyProduct(id: number) {
    this.show_checkout = true;
    this._customerService.quickBuyProduct(id);
    this._router.navigateByUrl('/checkout');
  }
  addToCart() {
    alert('Upcomming.....');
  }
}

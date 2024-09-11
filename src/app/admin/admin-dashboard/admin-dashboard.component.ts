import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from '../../customer/signin/signin.component';
import { Router } from '@angular/router';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { AdminService } from '../services/admin.service';
import { Product } from '../../core/model/object-model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  user_dashboard_data: any;
  total_user: number = 0;
  admin_user: number = 0;
  seller_user: number = 0;
  buyer_user: number = 0;

  product_dashboard_data: any;
  total_product: number = 0;
  publish_product: number = 0;
  inactive_product: number = 0;
  draft_product: number = 0;

  constructor(private _router: Router, private _adminService: AdminService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.adminProductDashboard();
    this.adminUserDashboardData();
  }

  userDashboard() {
    this._router.navigateByUrl('admin/user');
  }
  productDashboard() {
    this._router.navigateByUrl('/admin/product');
  }
  adminUserDashboardData() {
    this._adminService.userDashboardData().subscribe(
      (data) => {
        this.user_dashboard_data = data;
        console.log(this.user_dashboard_data);
        for (const user in this.user_dashboard_data) {
          if (this.user_dashboard_data[user].role == 'admin') {
            ++this.admin_user;
          } else if (this.user_dashboard_data[user].role == 'buyer') {
            ++this.buyer_user;
          } else if (this.user_dashboard_data[user].role == 'seller') {
            ++this.seller_user;
          }
          ++this.total_user;
        }
      },
      (error) => {
        console.error('errordata', error);
      }
    );
  }

  adminProductDashboard() {
    this._adminService.productDashboardData().subscribe((data) => {
      this.product_dashboard_data = data;
      console.log(this.product_dashboard_data);
      for (const product in this.product_dashboard_data) {
        if (this.product_dashboard_data[product].status == 'publish') {
          ++this.publish_product;
        } else if (this.product_dashboard_data[product].status == 'inactive') {
          ++this.inactive_product;
        } else if (this.product_dashboard_data[product].status == 'draft') {
          ++this.draft_product;
        }
        ++this.total_product;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Product, User } from '../../../core/model/object-model';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  productById: any;
  user_Id: any;
  individualProduct!: Product;
  user_detail!: User;
  user_address: any;
  user_contact_no: any;
  order_dto: any;
  product_Id: any;
  user_name: any;

  constructor(
    private _customerService: CustomerService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this._customerService.currentProduct.subscribe((product) => {
      this.productById = product;
    });
    this.user_Id = Number(sessionStorage.getItem('user_session_id'));
    this.productDetail(this.productById);
    this.userAddress(this.user_Id);
  }

  productDetail(productById: any) {
    this._customerService.productById(productById).subscribe(
      (data) => {
        this.individualProduct = data;
        console.log(this.individualProduct);
      },
      (error) => {
        console.error('error fetching product', error);
      }
    );
  }

  userAddress(user_id: any) {
    this._customerService.userById(user_id).subscribe(
      (data) => {
        console.log('Address:', data);
        this.user_name = data.name;
        this.user_address = data.address;
        this.user_contact_no = data.mobileNumber;
      },
      (error) => {
        console.error('Error in fetching address', error);
      }
    );
  }
  placeOrder() {
    this.order_dto = {
      id: 0,
      userId: this.user_Id,
      sellerId: 2,
      product: {
        id: this.product_Id,
        name: this.individualProduct.name,
        uploadPhoto: this.individualProduct.uploadPhoto,
        uploadDesc: this.individualProduct.uploadDesc,
        mrp: this.individualProduct.mrp,
        dp: this.individualProduct.dp,
        status: this.individualProduct.status,
      },
      deliverAdress: {
        id: 0,
        addLine1: this.user_address.addLine1,
        addLine2: this.user_address.addLine2,
        city: this.user_address.city,
        state: this.user_address.state,
        zipCode: this.user_address.zipCode,
      },
      contact: this.user_contact_no,
      date: new Date().toLocaleDateString(),
    };
    this._customerService.insertNewOrder(this.order_dto).subscribe(
      (data) => {
        alert('Order Placed successfully..');
        this._router.navigateByUrl('/buyer-dashboard');
      },
      (error) => {
        console.error('Error in Placeing Order...');
      }
    );
  }
}

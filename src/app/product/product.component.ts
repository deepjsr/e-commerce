import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../core/model/object-model';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../shared/services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  all_product_data: any;
  addEditProductForm: any;
  allEditProduct: boolean = false;
  popUpHeader!: string;
  add_product!: boolean;

  edit_product!: boolean;
  product_data: any;
  single_product: any;
  product_dto!: Product;
  edit_Product_id: any;
  addEditProduct: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _productService: ProductService
  ) {}
  ngOnInit(): void {
    this.addEditProductForm = this._formBuilder.group({
      name: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      productDesc: ['', Validators.required],
      mrp: ['', Validators.required],
      dp: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.getAllProduct();
  }

  get rf() {
    return this.addEditProductForm.controls;
  }

  getAllProduct() {
    this._productService.allProduct().subscribe(
      (data) => {
        this.all_product_data = data;
        console.log('All Prod DATA', this.all_product_data);
      },
      (errro) => {
        console.error('Error Geting all product');
      }
    );
  }

  addProductPopup() {
    this.add_product = true;
    this.edit_product = false;
    this.popUpHeader = 'Add New Product';
    this.addEditProductForm.reset();
  }

  addNewProduct() {
    this.addEditProduct = true;
    if (this.addEditProductForm.invalid) {
      return;
    }
    this.product_data = this.addEditProductForm.value;
    this.product_dto = {
      id: 0,
      name: this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      uploadDesc: this.product_data.uploadDesc,
      mrp: this.product_data.mrp,
      dp: this.product_data.dp,
      status: this.product_data.status,
    };
    this._productService.addNewProduct(this.product_dto).subscribe(
      (data) => {
        console.log(data);
        this.getAllProduct();
      },
      (error) => {
        console.log('Error adding product', error);
      }
    );
  }

  editProductPopUp(id: number) {
    this.add_product = false;
    this.edit_product = true;
    this.popUpHeader = 'Edit Product Data';
    this.addEditProductForm.reset();
    this._productService.getProductById(id).subscribe((data) => {
      console.log(data);
      this.single_product = data;
      this.edit_Product_id = data.id;
      this.addEditProductForm.patchValue({
        name: this.single_product.name,
        uploadPhoto: this.single_product.uploadPhoto,
        productdDesc: this.single_product.productdDesc,
        mrp: this.single_product.mrp,
        dp: this.single_product.dp,
        status: this.single_product.status,
      });
    });
  }
  updateProduct() {
    this.addEditProduct = true;
    if (this.addEditProductForm.invalid) {
      return;
    }
    this.product_data = this.addEditProductForm.value;
    this.product_dto = {
      id: 0,
      name: this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      uploadDesc: this.product_data.uploadDesc,
      mrp: this.product_data.mrp,
      dp: this.product_data.dp,
      status: this.product_data.status,
    };
    this._productService
      .updateProduct(this.edit_Product_id, this.product_dto)
      .subscribe(
        (data) => {
          this.getAllProduct();
        },
        (error) => {
          console.log('Error updating product', error);
        }
      );
  }
  deleteProduct(id: number) {
    let conf = confirm('Are You Sure Deleting This Product id:' + id);
    if (conf) {
      this._productService.deleteProduct(id).subscribe(
        (data) => {
          console.log('Deleted Successful', data);
          this.getAllProduct();
        },
        (error) => {
          console.error('Error deleting data');
        }
      );
    } else {
      alert('Canceled...!');
    }
  }
}

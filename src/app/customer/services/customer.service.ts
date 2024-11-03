import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private singleProduct_id = new BehaviorSubject(null);
  currentProduct = this.singleProduct_id.asObservable();
  public user_URL = 'http://localhost:3000/user/';
  public product_URL = 'http://localhost:3000/products/';
  // public product_URL = 'https://fakestoreapi.com/products/';
  public orders_URL = 'http://localhost:3000/orders';

  constructor(private _apiService: ApiService) {}

  allProduct(): Observable<any> {
    return this._apiService.get(this.product_URL);
  }
  quickBuyProduct(product_id: any) {
    this.singleProduct_id.next(product_id);
  }
  productById(productId: any) {
    return this._apiService.get(this.product_URL + productId);
  }
  userById(id: any) {
    return this._apiService.get(this.user_URL + id);
  }
  insertNewOrder(order_dto: any): Observable<any> {
    return this._apiService.post(this.orders_URL, order_dto);
  }
  orderDashBoardData(): Observable<any> {
    return this._apiService.get(this.orders_URL);
  }
  productDashboardData(): Observable<any> {
    return this._apiService.get(this.product_URL);
  }
}

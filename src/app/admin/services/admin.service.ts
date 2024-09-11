import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public user_URL = 'http://localhost:3000/user';
  public product_URL = 'http://localhost:3000/products';
  public orders_URL = 'http://localhost:3000/orders';
  constructor(private _apiService: ApiService) {}

  userDashboardData() {
    return this._apiService.get(this.user_URL + '/');
  }

  productDashboardData() {
    return this._apiService.get(this.product_URL);
  }

  orderDashboardData() {
    return this._apiService.get(this.orders_URL);
  }

  alluser(): Observable<any> {
    return this._apiService.get(this.user_URL);
  }

  addUser(user_dto: any) {
    return this._apiService.post(this.user_URL, user_dto);
  }

  userById(user_id: any) {
    const getById = this.user_URL + '/' + user_id;
    return this._apiService.get(getById);
  }

  editUser(user_dto: any, user_id: any): Observable<any> {
    return this._apiService.put(this.user_URL + user_id, user_dto);
  }

  // delete user
  deleteUser(user_id: any) {
    return this._apiService.delete(this.user_URL + '/' + user_id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  product_url = '  http://localhost:3000/products/';
  constructor(
    private _httpService: HttpClient,
    private _apiService: ApiService
  ) {}

  allProduct(): Observable<any> {
    return this._apiService.get(this.product_url);
  }

  getProductById(product_id: number) {
    return this._apiService.get(this.product_url + product_id);
  }

  addNewProduct(product_dto: Object): Observable<any> {
    return this._apiService.post(this.product_url, product_dto);
  }

  updateProduct(product_id: number, product_dto: Object): Observable<any> {
    return this._apiService.put(this.product_url + product_id, product_dto);
  }

  deleteProduct(product_id: number) {
    return this._apiService.delete(this.product_url + product_id);
  }
}

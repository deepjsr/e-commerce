import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public USER_URL = 'http://localhost:3000/user/';
  constructor(
    private _httpClient: HttpClient,
    private _apiService: ApiService
  ) {}

  getUserById(user_id: any) {
    return this._apiService.get(this.USER_URL + user_id);
  }

  updateUser(user_id: any, user_dto: {}): Observable<any> {
    return this._apiService.put(this.USER_URL + user_id, user_dto);
  }
}

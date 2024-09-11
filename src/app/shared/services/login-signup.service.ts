import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  public LOGIN_URL="http://localhost:3000";
  public REG_URL="  http://localhost:3000";
  
  constructor(private _http:HttpClient,private _apiService:ApiService) {
   }

   authLogin(user_name: string,password: string):Observable<any>{
    return this._apiService.get(this.LOGIN_URL+'/user?email='+user_name+'&password'+password)
   }

   userRegister(user_details: object | undefined):Observable<any>{
    return this._apiService.post(this.REG_URL+'/user',user_details)
   }

   adminLogin(user_name: string,password: string):Observable<any>{
    return this._apiService.get(this.LOGIN_URL+'/user?email='+user_name+'&password'+password+'&role=admin')
   }
}


import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

// admin before login check
@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardLogin implements CanActivate {
  constructor(private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem('role');
    if (role=='admin') {
      this._router.navigateByUrl('/admin-dashboard')
      return false;
    }else{
      return true;
    }
  }
}

// after login check
@Injectable({
  providedIn: 'root',
})

export class AdminAuthGuardService  {
  constructor(private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem('role');
    if (role=='admin') {
      return true;
    }else{
      this._router.navigate(['/admin-login'])
      return false;
    }
  }
}
// after (buyer/seller) login check
@Injectable({
  providedIn: 'root',
})

export class SellerBuyerAuthGuardLogin implements CanActivate  {
  constructor(private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem('role');

    if (role=='seller') {
      this._router.navigateByUrl('/seller-dashboard')
      return false;
    }else if(role== 'buyer'){
      this._router.navigateByUrl('/buyer-dashboard')
      return false;
    }else{
      return true
    }
  }
}


// after buyer login check
@Injectable({
  providedIn: 'root',
})

export class BuyerAuthGuardService  {
  constructor(private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem('role');

    if (role=='buyer') {
      return true;
    }else{
      this._router.navigate(['/sign-in'])
      return false;
    }
  }
}
// after seller login check
@Injectable({
  providedIn: 'root',
})

export class SellerAuthGuardService  {
  constructor(private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem('role');
    console.log(role,'from - Guard');
    if (role=='seller') {
      return true;
    }else{
      this._router.navigate(['/sign-in'])
      return false;
    }
  }
}

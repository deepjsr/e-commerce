import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, RouterLink, HttpClientModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  signInFormValue: any = {};
  user_data: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _logInSignupService: LoginSignupService
  ) {}

  OnsubmitSignIn() {
    this._logInSignupService
      .authLogin(
        this.signInFormValue.userEmail,
        this.signInFormValue.userPassword
      )
      .subscribe(
        (data) => {
          this.user_data = data;
          if (this.user_data.length == 1) {
            if (this.user_data[0].role == 'seller') {
              sessionStorage.setItem('User_session_id', this.user_data[0].id);
              sessionStorage.setItem('Role: ', this.user_data[0].role);
              this._router.navigateByUrl('/seller-dashboard');
            } else if (this.user_data[0].role == 'buyer') {
              sessionStorage.setItem('User_session_id', this.user_data[0].id);
              sessionStorage.setItem('Role: ', this.user_data[0].role);
              this._router.navigateByUrl('/buyer-dashboard');
            } else {
              alert('INVELID CREDENTIAL 😒!');
              // Swal.fire({
              //   icon: 'error',
              //   title: 'Oops... 😒',
              //   text: 'Invalid credential..!',
              // });
            }
          }
          console.log(this.user_data);
        },
        (error) => console.error(error)
      );
  }
}

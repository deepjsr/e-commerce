import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSignupService } from '../../shared/services/login-signup.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  signInFormValue: any = {};
  user_data: any;
  constructor(
    private _router: Router,
    private _loginService: LoginSignupService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  onSubmitSignIn() {
    this._loginService
      .adminLogin(
        this.signInFormValue.userEmail,
        this.signInFormValue.userPpassword
      )
      .subscribe(
        (data) => {
          this.user_data = data;
          if (this.user_data.length == 1) {
            sessionStorage.setItem('user_session_id', this.user_data[0].id);
            sessionStorage.setItem('role', this.user_data[0].role);
            this._router.navigateByUrl('/admin-dashboard');
          } else {
            alert('Invalid Response');
          }
          console.log(this.user_data);
        },
        (error) => console.error('Error on frtching data', error)
      );
  }
}

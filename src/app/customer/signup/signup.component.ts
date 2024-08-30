import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../core/model/object-model';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import Swal from 'sweetalert2'
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink,HttpClientModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  regform: boolean = false;
  signUpForm!: FormGroup;
  signIn!: FormGroup;
  signUpsubmitted = false;
  herf: string = '';
  user_data: any;
  user_dto!: User;
  user_reg_data: any;
  signInFormValue: any = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _logInSignupService: LoginSignupService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.herf = this._router.url;
    if (this.herf == '/sign-in') {
      this.regform = true;
    } else if (this.herf == '/sign-in') {
      this.regform = false;
    }

    this.signUpForm = this._formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      role: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      addLine1: ['', Validators.required],
      addLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      gender: ['', Validators.required],
      language: ['', Validators.required],
      dob: ['', Validators.required],
      agreetc: ['', Validators.required],
      email: ['', Validators.required],
      age: ['', Validators.required],
      aboutYou: ['', Validators.required],
    });
  }

  get rf() {
    return this.signUpForm.controls;
  }
  onSubmitSignUp() {
    this.signUpsubmitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.user_reg_data=this.signUpForm.value;
    this.user_dto={
      aboutYou:this.user_reg_data.aboutYou,
      age:this.user_reg_data.age,
      agreetc:this.user_reg_data.agreetc,
      dob:this.user_reg_data.dob,
      email:this.user_reg_data.email,
      gender:this.user_reg_data.gender,
      address:{
        id:this.user_reg_data.id,
        addLine1:this.user_reg_data.addLine1,
        addLine2:this.user_reg_data.addLine2,
        city:this.user_reg_data.city,
        state:this.user_reg_data.state,
        zipCode:this.user_reg_data.zipCode,
      },
      language:this.user_reg_data.language,
      mobileNumber:this.user_reg_data.mobNumber,
      name:this.user_reg_data.name,
      password:this.user_reg_data.password,
      uploadPhoto:this.user_reg_data.uploadPhoto,
      role:this.user_reg_data.role,
    }
    this._logInSignupService.userRegister(this.user_dto).subscribe(data=>{
      Swal.fire("User Registered Successfulu!");
      this._router.navigateByUrl('/sign-in')
    })
  }
}

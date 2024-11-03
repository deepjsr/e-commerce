import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  userProfileForm!: FormGroup;
  userProfile: boolean = false;
  user_id!: number;
  user_data!: any;
  user_update_data: any;
  user_profile_pic: any;
  user_language: any;
  user_role: any;
  user_dto: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private user_service: UserService
  ) {}
  ngOnInit(): void {
    this.user_id = Number(sessionStorage.getItem('user_session_id'));
    this.userProfileForm = this._formBuilder.group({
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
    return this.userProfileForm.controls;
  }

  ediUserData(user_id: any) {
    this.user_service.getUserById(user_id).subscribe(
      (data) => {
        this.user_data = data;
        this.user_profile_pic = this.user_data.uploadPhoto;
        this.user_language = this.user_language;
        this.user_role = this.user_role;
        this.userProfileForm.patchValue({
          name: this.user_data.name,
          email: this.user_data.email,
          age: this.user_data.age,
          dob: this.user_data.dob,
          mobileNumber: this.user_data.mobileNumber,
          password: this.user_data.password,
          gender: this.user_data.gender,
          language: this.user_data.language,
          addressLine1: this.user_data.address.addLine1,
          addressLine2: this.user_data.address.addLine2,
          city: this.user_data.address.city,
          state: this.user_data.address.state,
          zipCode: this.user_data.address.zipCode,
          aboutYou: this.user_data.aboutYou,
          uploadPhoto: '',
        });
      },
      (error) => {
        console.log('Error in fetching', error);
      }
    );
  }
  updateProfile() {
    this.userProfile = true;
    if (this.userProfileForm.invalid) {
      return;
    }
    this.user_update_data = this.userProfileForm.value;
    this.user_dto = {
      aboutYou: this.user_update_data.aboutYou,
      age: this.user_update_data.age,
      agreetc: this.user_update_data.agreetc,
      dob: this.user_update_data.dob,
      email: this.user_update_data.email,
      gender: this.user_update_data.gender,
      address: {
        id: this.user_update_data.id,
        addressLine1: this.user_update_data.addLine1,
        addressLine2: this.user_update_data.addLine2,
        city: this.user_update_data.city,
        state: this.user_update_data.state,
        zipCode: this.user_update_data.zipCode,
      },
      language: this.user_update_data.language,
      mobileNumber: this.user_update_data.mobileNumber,
      name: this.user_update_data.name,
      password: this.user_update_data.password,
      uploadPhoto:
        this.user_update_data.uploadPhoto == ''
          ? this.user_profile_pic
          : this.user_update_data.uploadPhoto,
    };
    this.user_service.updateUser(this.user_id, this.user_dto).subscribe(
      (data) => {
        alert('Profile Update successful !');
        if (this.user_role == 'admin') {
          this._router.navigateByUrl('/admin/dashboard');
        } else if (this.user_role == 'buyer') {
          this._router.navigateByUrl('/buyer/dashboard');
        } else if (this.user_role == 'seller') {
          this._router.navigateByUrl('/seller/dashboard');
        }
      },
      (error) => {
        console.error('Error Updating data');
      }
    );
  }
}

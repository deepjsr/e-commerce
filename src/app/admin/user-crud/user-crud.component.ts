import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../../core/model/object-model';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';

declare var $: any;
@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css',
})
export class UserCrudComponent implements OnInit {
  all_user_data: any;
  single_user_data: any;
  add_user: boolean = true;
  add_edit_user_form!: FormGroup;
  user_dto!: User;
  user_registration_data: any;
  edit_user_id: any;
  upload_file_name!: string;
  add_edit_user: boolean = false; //form validation
  edit_user: boolean = false;
  popup_header!: string;
  signInFormValue: any = {};
  user_reg_data: any;
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _adminService: AdminService
  ) {}
  ngOnInit(): void {
    this.getAllUser();
    this.add_edit_user_form = this._formBuilder.group({
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

  getAllUser() {
    this._adminService.alluser().subscribe(
      (data) => {
        console.log(data);
        this.all_user_data = data;
      },
      (error) => {
        console.error('Error in fetchin', error);
      }
    );
  }

  get rf() {
    return this.add_edit_user_form.controls;
  }

  addUserPopUp() {
    this.edit_user = false;
    this.add_user = true;
    this.popup_header = 'Add new user';
    this.add_edit_user_form.reset();
  }

  addUser() {
    this.add_edit_user = true;
    if (this.add_edit_user_form.invalid) {
      alert('Error:-0)\n\n' + JSON.stringify(this.add_edit_user_form.value));
      return;
    } else {
      this.user_registration_data = this.add_edit_user_form.value;
      this.user_dto = {
        age: this.user_registration_data.age,
        aboutYou: this.user_registration_data.aboutYou,
        agreetc: this.user_registration_data.agreetc,
        dob: this.user_registration_data.dob,
        email: this.user_registration_data.email,
        gender: this.user_registration_data.gender,
        address: {
          id: this.user_registration_data.id,
          addressLine1: this.user_registration_data.addLine1,
          addressLine2: this.user_registration_data.addLine2,
          city: this.user_registration_data.city,
          state: this.user_registration_data.state,
          zipCode: this.user_registration_data.zipCode,
        },
        language: this.user_registration_data.language,
        mobileNumber: this.user_registration_data.mobileNumber,
        name: this.user_registration_data.name,
        password: this.user_registration_data.password,
        uploadPhoto: this.user_registration_data.uploadPhoto,
        role: this.user_registration_data.role,
      };
    }
    this._adminService.addUser(this.user_dto).subscribe(
      (data) => {
        this.getAllUser();
        $('#addEditUserModal').modal('toggle');
        this.add_edit_user_form.reset();
        let ref = document.getElementById('close');
        ref?.click();
      },
      (error) => console.error('Error opening form', error)
    );
  }
  editUserPopUp(user_id: any) {
    this.edit_user_id = user_id;

    this.edit_user = true;
    this.add_user = false;
    this.popup_header = 'Edit User';
    this._adminService.userById(user_id).subscribe(
      (data) => {
        this.single_user_data = data;
        this.upload_file_name = this.single_user_data.uploadPhoto;
        this.add_edit_user_form.patchValue({
          name: this.single_user_data.name,
          email: this.single_user_data.email,
          age: this.single_user_data.age,
          dob: this.single_user_data.dob,
          mobileNumber: this.single_user_data.mobileNumber,
          password: this.single_user_data.password,
          role: this.single_user_data.role,
          gender: this.single_user_data.gender,
          language: this.single_user_data.language,
          addressLine1: this.single_user_data.address.addLine1,
          addressLine2: this.single_user_data.address.addLine2,
          city: this.single_user_data.address.city,
          state: this.single_user_data.address.state,
          zipCode: this.single_user_data.address.zipCode,
          aboutYou: this.single_user_data.aboutYou,
          uploadPhoto: '',
          agreetc: this.single_user_data.agreetc,
        });
      },
      (error) => {
        console.error('Error in edit user', error);
      }
    );
  }
  updateUser() {
    if (this.add_edit_user_form.invalid) {
      alert('Error:-0)\n\n' + JSON.stringify(this.add_edit_user_form.value));
      return;
    } else {
      this.user_registration_data = this.add_edit_user_form.value;
      this.user_dto = {
        aboutYou: this.user_registration_data.aboutYou,
        age: this.user_registration_data.age,
        agreetc: this.user_registration_data.agreetc,
        dob: this.user_registration_data.dob,
        email: this.user_registration_data.email,
        gender: this.user_registration_data.gender,
        address: {
          id: this.user_registration_data.id,
          addressLine1: this.user_registration_data.addLine1,
          addressLine2: this.user_registration_data.addLine2,
          city: this.user_registration_data.city,
          state: this.user_registration_data.state,
          zipCode: this.user_registration_data.zipCode,
        },
        language: this.user_registration_data.language,
        mobileNumber: this.user_registration_data.mobileNumber,
        name: this.user_registration_data.name,
        password: this.user_registration_data.password,
        uploadPhoto:
          this.user_registration_data.uploadPhoto == ''
            ? this.upload_file_name
            : this.user_registration_data.uploadPhoto,
        role: this.user_registration_data.role,
      };
    }
    this._adminService.editUser(this.user_dto, this.edit_user_id).subscribe(
      (data) => {
        console.log(data, 'returned from there');
        this.getAllUser();
        this.add_edit_user_form.reset();
        $('#addEditUserModal').modal('toggle');
      },
      (error) => console.error('Error opening form', error)
    );
  }

  deleteUser(userId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._adminService.deleteUser(userId).subscribe(
          (data) => {
            this.getAllUser();
          },
          (error) => {
            console.error(error);
          }
        );
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  }
}

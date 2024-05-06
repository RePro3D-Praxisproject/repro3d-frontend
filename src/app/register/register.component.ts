import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/interfaces/user'
import { hashSync } from 'bcryptjs';
import { NgIf } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, HttpClientTestingModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  public registrationSuccess: boolean = false;
  public registrationFailed: boolean = false;
  public errorMsg: string = "";

  public registerFormGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$')]],
      fname: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_conf: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    this.registrationFailed = false;
    this.registrationSuccess = false;
    
    if (this.registerFormGroup.invalid) {
      console.log(this.registerFormGroup)
      switch ("INVALID") {
        case this.registerFormGroup.controls['email'].status:
          this.errorMsg = "Email is invalid.";
          break;
        case this.registerFormGroup.controls['fname'].status:
          this.errorMsg = "Full Name is empty.";
          break;
        case this.registerFormGroup.controls['address'].status:
          this.errorMsg = "Billing Address is empty.";
          break;
        case this.registerFormGroup.controls['password'].status:
          this.errorMsg = "Password is invalid.";
          break;
        case this.registerFormGroup.controls['password_conf'].status:
          this.errorMsg = "Passwords do not match.";
          break;
      }
      
      this.registrationFailed = true;
    } else if (this.registerFormGroup.getRawValue().password !== this.registerFormGroup.getRawValue().password_conf) {
      this.errorMsg = "Passwords do not match."
      this.registrationFailed = true;
      return;
    } else {
      const registeringUser = {
        userId: null,
        email: this.registerFormGroup.getRawValue().email,
        billingAddress: this.registerFormGroup.getRawValue().fname,
        role: {
          roleId: 2,
          roleName: ""
        },
        password_hash: this.registerFormGroup.getRawValue().password
      }
      console.log(registeringUser);
      this.authService.register(registeringUser).subscribe(
        data => {
          if (data.success) {
            this.registrationSuccess = true;
          }
        },
        error => {
          console.log(error);
          this.registrationFailed = true;
          this.errorMsg = "Internal error."
          console.log(this.registrationFailed);
        }
      );
    }
  }

  validateEmail(): boolean {
    console.log("asdasd")
    return !new RegExp("/^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\. [a-zA-Z]{2,}$/").test(this.registerFormGroup.getRawValue()["email"]);
  }
}

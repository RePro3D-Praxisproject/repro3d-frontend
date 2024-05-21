import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/interfaces/user';
import { NgIf } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/**
 * Component for user registration.
 * Handles form validation, user registration, and navigation on success.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, HttpClientTestingModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  /** Indicates if registration was successful. */
  public registrationSuccess: boolean = false;

  /** Indicates if registration failed. */
  public registrationFailed: boolean = false;

  /** Error message to display on registration failure. */
  public errorMsg: string = "";

  /** Form group for the registration form. */
  public registerFormGroup: FormGroup;

  /**
   * Constructs the RegisterComponent.
   * 
   * @param {FormBuilder} formBuilder - The form builder for creating forms.
   * @param {AuthService} authService - The authentication service.
   * @param {Router} router - The router for navigation.
   */
  constructor(private readonly formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$')]],
      fname: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_conf: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  /**
   * Handles form submission for registration.
   * Validates the form, creates the user object, and calls the register method of the authService.
   */
  onSubmit() {
    this.registrationFailed = false;
    this.registrationSuccess = false;

    if (this.registerFormGroup.invalid) {
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
      this.errorMsg = "Passwords do not match.";
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
        passwordHash: this.registerFormGroup.getRawValue().password
      };
      console.log(registeringUser);
      this.authService.register(registeringUser).subscribe(
        data => {
          if (data.success) {
            this.registrationSuccess = true;
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 3000);
          }
        },
        error => {
          console.log(error);
          this.registrationFailed = true;
          this.errorMsg = "Internal error.";
          console.log(this.registrationFailed);
        }
      );
    }
  }

  /**
   * Validates the email format.
   * 
   * @returns {boolean} - True if the email is invalid, false otherwise.
   */
  validateEmail(): boolean {
    return !new RegExp("/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/").test(this.registerFormGroup.getRawValue()["email"]);
  }
}

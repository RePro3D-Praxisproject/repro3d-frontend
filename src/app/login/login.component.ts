import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/**
 * Component for the login page.
 * Handles user login form submission and authentication.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, HttpClientTestingModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  /** Form group for the login form. */
  public readonly loginFormGroup: FormGroup;

  /** Indicates if the login attempt has failed. */
  public loginFailed: boolean;

  /**
   * Constructs the LoginComponent.
   * 
   * @param {FormBuilder} formBuilder - The form builder for creating forms.
   * @param {AuthService} authService - The authentication service.
   * @param {Router} router - The router for navigation.
   */
  constructor(private readonly formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginFailed = false;
  }

  /**
   * Handles the form submission for login.
   * Validates the form and attempts to log in the user.
   * On success, stores user data in local storage and navigates to the home page.
   * On failure, sets the loginFailed flag and logs out the user.
   */
  public async onSubmit() {
    if (this.loginFormGroup.invalid) {
      alert('Invalid input');
    } else {
      this.authService.login(this.loginFormGroup.getRawValue().username, this.loginFormGroup.getRawValue().password).subscribe(
        data => {
          localStorage.setItem('email', this.loginFormGroup.getRawValue().username);
          localStorage.setItem('password', this.loginFormGroup.getRawValue().password);
          localStorage.setItem('userdata', JSON.stringify(data));
          console.log('Login successful');
          this.router.navigate(['/']);
        },
        error => {
          this.loginFailed = true;
          this.authService.logout();
          console.error('Login failed');
        }
      );
    }
  }

  /**
   * Initializes the component.
   * If the user is already logged in, navigates to the home page.
   */
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }
}

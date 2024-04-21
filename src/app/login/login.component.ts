import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, HttpClientTestingModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public readonly loginFormGroup: FormGroup;

  public loginFailed: boolean;

  constructor(private readonly formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginFailed = false;
  }

  public async onSubmit() {
    if (this.loginFormGroup.invalid) {
      alert('Invalid input');
    } else {
      this.authService.login(this.loginFormGroup.getRawValue().username, this.loginFormGroup.getRawValue().password).subscribe(
        data => {
          localStorage.setItem('email', this.loginFormGroup.getRawValue().username);
          localStorage.setItem('password', this.loginFormGroup.getRawValue().password);
          console.log('Login successful');
        },
        error => {
          this.loginFailed = true;
          this.authService.logout();
          console.error('Login failed');
        }
      );
    }
      
  }

}

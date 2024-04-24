import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/interfaces/user'
import { hashSync } from 'bcryptjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  public registrationSuccess: boolean = false;
  public registrationFailed: boolean = false;

  public readonly registerFormGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerFormGroup = this.formBuilder.group({
      email: ['', Validators.email],
      fname: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      password_conf: ['', Validators.required]
    });
  }

  onSubmit() {
    this.registrationFailed = false;
    this.registrationSuccess = false;
    if (this.registerFormGroup.invalid) {
      alert('Invalid input');
    } else {
      const registeringUser: User = {
        userId: null,
        email: this.registerFormGroup.getRawValue().email,
        billingAddress: this.registerFormGroup.getRawValue().fname,
        role: {
          roleId: 2,
          roleName: ""
        },
        // including this is probably a VERY BAD IDEA
        passwordHash: hashSync(this.registerFormGroup.getRawValue().password)
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
          console.log(this.registrationFailed);
        }
      );
    }
  }
}

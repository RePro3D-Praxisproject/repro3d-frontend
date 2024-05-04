import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../shared/services/auth.service';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let formBuilder: FormBuilder;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService);
    formBuilder = TestBed.inject(FormBuilder);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.registerFormGroup = formBuilder.group({
      email: ['person@example.org', [Validators.email, Validators.required]],
      fname: ['Mr Example Persona', Validators.required],
      address: ['1000 Examplistan, Sample St. 69420', Validators.required],
      password: ['porejemplo123', [Validators.required, Validators.minLength(8)]],
      password_conf: ['porejemplo123', [Validators.required, Validators.minLength(8)]]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form group', () => {
    const formGroup = component.registerFormGroup;
    expect(formGroup.contains('email')).toBeTruthy();
    expect(formGroup.contains('fname')).toBeTruthy();
    expect(formGroup.contains('address')).toBeTruthy();
    expect(formGroup.contains('password')).toBeTruthy();
    expect(formGroup.contains('password_conf')).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.registerFormGroup = formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      fname: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_conf: ['', [Validators.required, Validators.minLength(8)]]
    });
    expect(component.registerFormGroup.valid).toBeFalsy();
  });

  it('should set registrationFailed to true on submit failure', fakeAsync(() => {
    spyOn(authService, 'register').and.returnValue(throwError(() => new Error('Failed')));
    component.onSubmit();
    tick();
    fixture.detectChanges();
    expect(component.registrationFailed).toBeTrue();
  }));

  it('should set registrationSuccess to true on submit success', fakeAsync(() => {
    spyOn(authService, 'register').and.returnValue(of({ success: true }));
    component.onSubmit();
    tick();
    fixture.detectChanges();
    expect(component.registrationSuccess).toBeTrue();
  }));


  it('should not be able to register if email is empty', () => {
    spyOn(authService, 'register');
    component.registerFormGroup.controls['email'].setValue('');
    component.onSubmit();
    expect(authService.register).not.toHaveBeenCalled();
    expect(component.errorMsg).toEqual('Email is invalid.');
  });

  it('should not be able to register if email is not an email', () => {
    spyOn(authService, 'register');
    component.registerFormGroup.controls['email'].setValue('not_an_email');
    component.onSubmit();
    expect(authService.register).not.toHaveBeenCalled();
    expect(component.errorMsg).toEqual('Email is invalid.');
  });

  it('should not be able to register if full name is empty', () => {
    spyOn(authService, 'register');
    component.registerFormGroup.controls['fname'].setValue('');
    component.onSubmit();
    expect(authService.register).not.toHaveBeenCalled();
    expect(component.errorMsg).toEqual('Full Name is empty.');
  });

  it('should not be able to register if billing address is empty', () => {
    spyOn(authService, 'register');
    component.registerFormGroup.controls['address'].setValue('');
    component.onSubmit();
    expect(authService.register).not.toHaveBeenCalled();
    expect(component.errorMsg).toEqual('Billing Address is empty.');
  });

  it('should not be able to register if password is invalid', () => {
    spyOn(authService, 'register');
    component.registerFormGroup.controls['password'].setValue('less8');
    component.onSubmit();
    expect(authService.register).not.toHaveBeenCalled();
    expect(component.errorMsg).toEqual('Password is invalid.');
  });

  it('should not be able to register if password is empty', () => {
    spyOn(authService, 'register');
    component.registerFormGroup.controls['password'].setValue('');
    component.onSubmit();
    expect(authService.register).not.toHaveBeenCalled();
    expect(component.errorMsg).toEqual('Password is invalid.');
  });

  it('should not be able to register if password confirmation is empty', () => {
    spyOn(authService, 'register');
    component.registerFormGroup.controls['password'].setValue('a_valid_password');
    component.registerFormGroup.controls['password_conf'].setValue('');
    component.onSubmit();
    expect(authService.register).not.toHaveBeenCalled();
    expect(component.errorMsg).toEqual('Passwords do not match.');
  });

  it('should not be able to register if passwords do not match', () => {
    spyOn(authService, 'register');
    component.registerFormGroup.controls['password'].setValue('a_valid_password_1');
    component.registerFormGroup.controls['password_conf'].setValue('a_valid_password_"');
    component.onSubmit();
    expect(authService.register).not.toHaveBeenCalled();
    expect(component.errorMsg).toEqual('Passwords do not match.');
  });


});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { OrderService } from '../shared/services/order.service';
import { By } from '@angular/platform-browser';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let mockOrderService: any;
  let mockActivatedRoute: any;
  let mockLocalStorage: any;

  beforeEach(async () => {

    mockLocalStorage = {};
    spyOn(window.localStorage, 'getItem').and.returnValue(
      `{"success":true,"message":"User found","data":{"userId":28,"email":"mahli@posteo.net","billingAddress":"1115 Budapest","role":{"roleId":1,"roleName":"MaaS Owner"},"passwordHash":"$2a$12$94ge9Ji7fSMms0Oq0i00yu/XW4NnPuwUZIZf2XlLCeSf4fmfmpyhi"}}`
    )

  

    // Mock OrderService
    mockOrderService = jasmine.createSpyObj('OrderService', ['getItemByIdAsync']);
    mockOrderService.getItemByIdAsync.and.returnValue(of({data: {
      item_id: 123,
      name: 'Laptop',
      image_url: 'http://example.com/laptop.jpg',
      cost: 1000,
      est_time: 30,
      material: 'Aluminum',
      dimensions: '15 inches',
      description: "",
      file_ref: ""
    }}));

    // Mock ActivatedRoute
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('123') // Assuming '123' is the product ID
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, CheckoutComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: OrderService, useValue: mockOrderService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product data on initialization', () => {
    expect(mockOrderService.getItemByIdAsync).toHaveBeenCalledWith(123);
    expect(component.product).toEqual(jasmine.objectContaining({name: 'Laptop', cost: 1000}));
  });

  it('should display product details if product exists', () => {
    component.product = {
      item_id: 0,
      name: 'Laptop',
      image_url: 'http://example.com/laptop.jpg',
      cost: 1000,
      est_time: 30,
      material: 'Aluminum',
      dimensions: '15 inches',
      description: "",
      file_ref: ""
    };
    fixture.detectChanges();
    const cardTitle = fixture.debugElement.query(By.css('.card-title')).nativeElement;
    expect(cardTitle.textContent).toContain('Laptop');
  });

  it('should display an error message if present', () => {
    component.errorMsg = 'Something went wrong';
    fixture.detectChanges();
    const errorAlert = fixture.debugElement.query(By.css('.alert-danger')).nativeElement;
    expect(errorAlert.textContent).toContain('Something went wrong');
  });

  it('should display a success message if present', () => {
    component.successMsg = 'Order successful';
    fixture.detectChanges();
    const successAlert = fixture.debugElement.query(By.css('.alert-success')).nativeElement;
    expect(successAlert.textContent).toContain('Order successful');
  });

  it('should fill in the redeem code when input', () => {
    component.checkoutForm.controls['redeem_code'].setValue('YTU3NzZhMzUtMDljOS00YmUxLWJhNDctODM0MjhjMzdlNDY3');
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input#redeem_code')).nativeElement;
    expect(input.value).toBe('YTU3NzZhMzUtMDljOS00YmUxLWJhNDctODM0MjhjMzdlNDY3');
  });

  it('should call placeOrder method when confirm button is clicked', () => {
    spyOn(component, 'placeOrder');
    const button = fixture.debugElement.query(By.css('button.btn-success')).nativeElement;
    button.click();
    expect(component.placeOrder).toHaveBeenCalled();
  });

  it('should have a link to cancel and return to products page', () => {
    const cancelButton = fixture.debugElement.query(By.css('a.btn-danger')).nativeElement;
    expect(cancelButton.getAttribute('href')).toEqual('/products');
  });
});

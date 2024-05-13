import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { WebshopService } from '../shared/services/webshop.service';
import { AuthService } from '../shared/services/auth.service';
import { BehaviorSubject, of, throwError } from 'rxjs';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let webshopServiceSpy: jasmine.SpyObj<WebshopService>;
  let isEnabledSubject: BehaviorSubject<boolean>;

  beforeEach(() => {
    // Mock dependencies
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    webshopServiceSpy = jasmine.createSpyObj('WebshopService', ['loadWebshopEnabled', 'toggleWebshop', 'isEnabled']);

    isEnabledSubject = new BehaviorSubject<boolean>(false); // Provides control over emitted values
    Object.defineProperty(webshopServiceSpy, 'isEnabled', {
      get: () => isEnabledSubject.asObservable()
    });

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AdminDashboardComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: WebshopService, useValue: webshopServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and set isWebshopEnabled based on service', fakeAsync(() => {
    isEnabledSubject.next(true);
    tick(); // Simulates the passage of time until all pending asynchronous activities finish
    expect(component.isWebshopEnabled).toBeTrue();
  }));

  it('should toggle webshop state to enabled', () => {
    spyOn(window, 'alert');
    webshopServiceSpy.toggleWebshop.and.returnValue(of(true)); // Return value when toggleWebshop is called

    component.toggleWebshop();
    expect(webshopServiceSpy.toggleWebshop).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Webshop is now enabled.');
  });

  it('should handle errors during webshop toggle', () => {
    webshopServiceSpy.toggleWebshop.and.returnValue(throwError(() => new Error('Failed to toggle')));
    spyOn(window, 'alert');

    component.toggleWebshop();
    expect(webshopServiceSpy.toggleWebshop).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Failed to toggle the webshop state.');
  });
});

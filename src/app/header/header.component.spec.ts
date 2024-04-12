import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent, // Import the standalone component
        RouterTestingModule // And RouterTestingModule for routerLink directives
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle navbar visibility', () => {
    expect(component.navbarOpen).toBeFalse(); // Default state
    component.toggleNavbar();
    expect(component.navbarOpen).toBeTrue(); // After one toggle
    component.toggleNavbar();
    expect(component.navbarOpen).toBeFalse(); // And back again
  });

  it('should display the brand name RePro3D', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // This assumes "RePro3D" is the second occurrence of `.navbar-brand`
    const brandNames = compiled.querySelectorAll('.navbar-brand');
    expect(brandNames.length).toBeGreaterThan(1); // Ensure there are at least two .navbar-brand elements
    expect(brandNames[1].textContent).toContain('RePro3D');
  });

  it('should have a link to the products page', () => {
    const compiled = fixture.debugElement.nativeElement;
    const modelsLink = compiled.querySelector('a[routerLink="/products"]');
    expect(modelsLink).toBeTruthy();
  });
});

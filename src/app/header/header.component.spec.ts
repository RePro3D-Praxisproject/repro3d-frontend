import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

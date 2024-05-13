import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AdminDashboardComponent } from "./admin-dashboard.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe('AdminDashboardComponent', () => {
    let component: AdminDashboardComponent;
    let fixture: ComponentFixture<AdminDashboardComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ AdminDashboardComponent, HttpClientTestingModule, RouterTestingModule],
      })
      .compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(AdminDashboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should display the admin dashboard title', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.jumbotron h1').textContent).toContain('Admin Dashboard');
    });
  
    it('should have buttons to manage printers, products, and redeem codes', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.btn-manage-printers')).toBeTruthy();
      expect(compiled.querySelector('.btn-manage-products')).toBeTruthy();
      expect(compiled.querySelector('.btn-manage-redeem-codes')).toBeTruthy();
    });
  
    it('should toggle webshop status', () => {
      component.isWebshopEnabled = true;
      spyOn(component, 'toggleWebshop');
      component.toggleWebshop()
      expect(component.toggleWebshop).toHaveBeenCalled();
    });
  
    it('should display correct toggle button text based on webshop status disable', () => {
      component.isWebshopEnabled = true;
      fixture.detectChanges();
      const button = fixture.debugElement.nativeElement.querySelector('.btn-disable-webshop');
      console.log(button.textContent)
      expect(button.textContent).toContain(' Disable Webshop ');
    });

    it('should display correct toggle button text based on webshop status enable', () => {
        component.isWebshopEnabled = false;
        const button = fixture.debugElement.nativeElement.querySelector('.btn-enable-webshop');
        console.log(button.textContent)
        fixture.detectChanges();
        expect(button.textContent).toContain(' Enable Webshop ');
      });
  });
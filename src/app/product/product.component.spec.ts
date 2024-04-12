import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
//import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductDataService } from './service/product-data.service';
//import { Product } from "../product-card/product-card.component";

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let mockProductDataService;

  beforeEach(async () => {

    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1') // Assuming '1' is the id
        }
      }
    };

    // Mock ProductDataService
    mockProductDataService = jasmine.createSpyObj('ProductDataService', ['getProductById']);
    mockProductDataService.getProductById.and.returnValue();

    await TestBed.configureTestingModule({

      imports: [RouterTestingModule, ProductComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ProductDataService, useValue: mockProductDataService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

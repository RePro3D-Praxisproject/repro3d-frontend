import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
//import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {OrderService} from "../../services/order-service.service";
//import { Product } from "../product-card/product-card.component";

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let mockOrderService;

  beforeEach(async () => {

    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1')
        }
      }
    };

    // Mock ProductDataService
    mockOrderService = jasmine.createSpyObj('ProductDataService', ['getProductById']);
    mockOrderService.getProductById.and.returnValue();

    await TestBed.configureTestingModule({

      imports: [RouterTestingModule, ProductComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: OrderService, useValue: mockOrderService }
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

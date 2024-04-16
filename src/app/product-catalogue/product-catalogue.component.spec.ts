import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCatalogueComponent } from './product-catalogue.component';
import { OrderService } from '../../services/order-service.service';

describe('ProductCatalogueComponent', () => {
  let component: ProductCatalogueComponent;
  let fixture: ComponentFixture<ProductCatalogueComponent>;
  let mockOrderService = jasmine.createSpyObj('OrderService', ['getAllProducts']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductCatalogueComponent
      ],
      providers: [
        { provide: OrderService, useValue: mockOrderService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

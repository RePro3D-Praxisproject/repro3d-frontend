import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCatalogueComponent } from './product-catalogue.component';
import { OrderService } from '../shared/services/order.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductCatalogueComponent', () => {
  let component: ProductCatalogueComponent;
  let fixture: ComponentFixture<ProductCatalogueComponent>;
  let mockOrderService = jasmine.createSpyObj('OrderService', ['loadAllItems']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductCatalogueComponent,
        HttpClientTestingModule,
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

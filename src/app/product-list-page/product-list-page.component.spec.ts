import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ProductListPageComponent } from './product-list-page.component';
import { OrderService } from '../shared/services/order.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Item } from '../shared/interfaces/item';

describe('ProductListPageComponent', () => {
  let component: ProductListPageComponent;
  let fixture: ComponentFixture<ProductListPageComponent>;
  let mockOrderService: any;
  let mockItems: Item[];

  beforeEach(waitForAsync(() => {
    mockItems = [
      {
        item_id: 1, name: 'Product 1', est_time: 60, cost: 100, dimensions: '10x10x10', material: 'Metal', description: 'A metal product',
        file_ref: '',
        image_url: ''
      },
      {
        item_id: 2, name: 'Product 2', est_time: 60, cost: 200, dimensions: '20x20x20', material: 'Wood', description: 'A wooden product',
        file_ref: '',
        image_url: ''
      }
    ];

    mockOrderService = jasmine.createSpyObj('OrderService', ['getAllProducts', 'createItem', 'updateItem', 'deleteItem', 'loadAllItems']);
    mockOrderService.getAllProducts.and.returnValue(of(mockItems));

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ProductListPageComponent
      ],
      declarations: [
      ],
      providers: [
        { provide: OrderService, useValue: mockOrderService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should save changes when an existing product is edited', async () => {
    const product = { ...mockItems[0], cost: 110 };
    component.openEditModal(product);
    component.saveChanges();
    expectAsync(mockOrderService.updateItem);
  });
  

  it('should save changes when a new product is added', () => {
    component.openAddProductModal();
    component.selectedProduct = { name: 'New Product', cost: 150, dimensions: '15x15x15', material: 'Plastic', description: 'New description', est_time: 1, file_ref: "", image_url: "", item_id: 0};
    component.saveChanges();
    expectAsync(mockOrderService.createItem);
  });

  it('should close the modal', () => {
    component.openAddProductModal();
    component.closeModal();
    expect(component.isModalOpen).toBeFalse();
  });

  it('should open the add product modal', () => {
    component.openAddProductModal();
    expect(component.selectedProduct).toBeTruthy();
    expect(component.isModalOpen).toBeTrue();
    expect(component.isNewProduct).toBeTrue();
  });

  it('should open the edit modal with a product', () => {
    const product = mockItems[0];
    component.openEditModal(product);
    expect(component.selectedProduct).toEqual(jasmine.objectContaining({ name: 'Product 1' }));
    expect(component.isModalOpen).toBeTrue();
  });
  

});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ProductListPageComponent } from './product-list-page.component';
import { OrderService } from '../shared/services/order.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Item } from '../shared/interfaces/item';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductListPageComponent', () => {
  let component: ProductListPageComponent;
  let fixture: ComponentFixture<ProductListPageComponent>;
  let mockOrderService: any;
  let mockItems: Item[];

  beforeEach(waitForAsync(() => {
    mockItems = [
      { item_id: 1, title: 'Product 1',est_time:60, price: 100, dimensions: '10x10x10', material: 'Metal', description: 'A metal product', imgUrl: 'url1' },
      { item_id: 2, title: 'Product 2',est_time:60, price: 200, dimensions: '20x20x20', material: 'Wood', description: 'A wooden product', imgUrl: 'url2' }
    ];

    mockOrderService = jasmine.createSpyObj('OrderService', ['getAllProducts', 'createItem', 'updateItem', 'deleteItem']);
    mockOrderService.getAllProducts.and.returnValue(of(mockItems));

    TestBed.configureTestingModule({
      imports: [FormsModule, ProductListPageComponent, HttpClientTestingModule],
      providers: [{ provide: OrderService, useValue: mockOrderService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ProductListPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();  // Trigger initial data binding and ngOnInit
    });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should save changes when an existing product is edited', () => {
    const product = { ...mockItems[0], price: 110 };
    component.openEditModal(product);
    component.saveChanges();
    expect(mockOrderService.updateItem).toHaveBeenCalledWith(component.selectedProduct);
  });

  it('should save changes when a new product is added', () => {
    component.openAddProductModal();
    component.selectedProduct = { title: 'New Product', price: 150, dimensions: '15x15x15', material: 'Plastic', description: 'New description' };
    component.saveChanges();
    expect(mockOrderService.createItem).toHaveBeenCalledWith(component.selectedProduct);
  });

  it('should close the modal', () => {
    component.openAddProductModal();
    component.closeModal();
    expect(component.isModalOpen).toBeFalse();
  });

  it('should open the add product modal', () => {
    component.openAddProductModal();
    expect(component.selectedProduct).toEqual(jasmine.objectContaining({ title: '', price: 0 }));
    expect(component.isModalOpen).toBeTrue();
    expect(component.isNewProduct).toBeTrue();
  });

  it('should open the edit modal with a product', () => {
    const product = mockItems[0];
    component.openEditModal(product);
    expect(component.selectedProduct).toEqual(jasmine.objectContaining({ title: 'Product 1' }));
    expect(component.isModalOpen).toBeTrue();
  });


});

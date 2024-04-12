import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListPageComponent } from './product-list-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {Product} from "../product-card/product-card.component";

describe('ProductListPageComponent', () => {
  let component: ProductListPageComponent;
  let fixture: ComponentFixture<ProductListPageComponent>;
  let mockActivatedRoute;

  beforeEach(async () => {
    // Setup mock ActivatedRoute
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => 'value' // Simulate route params
        }
      },
      params: of({id: 123})
    };

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ProductListPageComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute } // Provide the mock ActivatedRoute
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    const product: Product = { id: 2, title: 'Another Product', price: 200, dimensions: '50x50x50', material: 'Plastic', description: 'Another description', buildTime: 'est. 2 Hours', imgUrl: 'another_link' };

    fixture = TestBed.createComponent(ProductListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initialize component and run ngOnInit if implemented
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); // Checks if the component instance was created
  });

  it('should toggle modal open and close', () => {
    expect(component.isModalOpen).toBeFalse(); // Initial state should be false
    component.toggleModal(true); // Open modal
    expect(component.isModalOpen).toBeTrue(); // Check if modal state is true
    component.toggleModal(false); // Close modal
    expect(component.isModalOpen).toBeFalse(); // Check if modal state is back to false
  });

  it('should open the modal with a selected product when openEditModal is called', () => {
    const product: Product = { id: 2, title: 'Another Product', price: 200, dimensions: '50x50x50', material: 'Plastic', description: 'Another description', buildTime: 'est. 2 Hours', imgUrl: 'another_link' };
    component.openEditModal(product);
    expect(component.selectedProduct).toEqual(product);
    expect(component.isModalOpen).toBeTrue();
  });


  it('should add a new product when addProduct is called', () => {
    component.addProduct();
    expect(component.products.length).toBe(6);
    expect(component.isModalOpen).toBeFalse();
  });

  it('should open the modal with a selected product when openEditModal is called', () => {
    const product: Product = { id: 2, title: 'Another Product', price: 200, dimensions: '50x50x50', material: 'Plastic', description: 'Another description', buildTime: 'est. 2 Hours', imgUrl: 'another_link' };
    component.openEditModal(product);
    expect(component.selectedProduct).toEqual(product);
    expect(component.isModalOpen).toBeTrue();
  });
});

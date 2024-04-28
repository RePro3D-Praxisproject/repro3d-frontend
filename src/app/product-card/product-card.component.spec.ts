import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './product-card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductCardComponent,
        RouterTestingModule,
        FormsModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    // Set up mock input data
    component.product = {
      item_id: 1,
      title: 'Test Product',
      cost: 100,
      dimensions: '10x10x10',
      material: 'Plastic',
      description: 'Test Description',
      est_time: 120,
      imgUrl: 'skull-picture.jpg'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

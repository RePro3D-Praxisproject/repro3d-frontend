import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './product-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, // Use this for components that might use routing features
        FormsModule, // Needed for [(ngModel)] bindings
        ProductCardComponent // Import the standalone component directly
      ]
      // Since ProductCardComponent is standalone and doesn't seem to require ActivatedRoute directly, you might not need the providers array here.
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter products correctly', () => {
    const testSearchTerm = 'yoda';
    component.searchTerm = testSearchTerm;
    fixture.detectChanges(); // Update view to ensure filteredProducts are recalculated

    // Check if component's filteredProducts only include products matching the search term
    const filteredProducts = component.filteredProducts;
    expect(filteredProducts.length).toBeGreaterThan(0); // Assuming you have at least one product matching "yoda"
    expect(filteredProducts.every(product => product.title.toLowerCase().includes(testSearchTerm.toLowerCase()))).toBeTrue();
  });

  it('should update searchTerm when input value changes', () => {
    const inputElement = fixture.debugElement.query(By.css('input[type="text"]')).nativeElement;

    // Simulate user typing "skull" into the search box
    inputElement.value = 'skull';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges(); // Manually trigger change detection

    expect(component.searchTerm).toBe('skull', 'searchTerm should update to "skull"');
  });

  it('should display the correct number of product cards after filtering', () => {
    component.searchTerm = 'yoda'; // Set search term
    fixture.detectChanges(); // Update view

    const cardElements = fixture.debugElement.queryAll(By.css('.card'));
    expect(cardElements.length).toBe(1); // Expect only one card displayed for "yoda"
  });
});

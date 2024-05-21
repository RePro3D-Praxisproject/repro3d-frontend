import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { NgForOf, NgIf, SlicePipe } from "@angular/common";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { OrderService } from '../shared/services/order.service';
import { Item } from '../shared/interfaces/item';
import { AuthService } from '../shared/services/auth.service';

/**
 * Component for displaying and managing the product list.
 * Allows for adding, editing, and deleting products.
 */
@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    SlicePipe
  ],
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent implements OnInit {
  /** The selected product for editing or adding. */
  selectedProduct: Item = { item_id: 0, name: '', cost: 0, dimensions: '', material: '', description: '', est_time: 0, file_ref: "", image_url: "" };
  
  /** Flag to indicate if the modal is open. */
  isModalOpen = false;

  /** Flag to indicate if a new product is being added. */
  isNewProduct: boolean = false;

  /** Form group for editing or adding a product. */
  productEditFormGroup: FormGroup;

  /** Error message for form validation errors. */
  errorMsg: string = "";

  /** List of products. */
  products: Item[] = [];

  /**
   * Constructs the ProductListPageComponent.
   * 
   * @param {OrderService} orderService - The service to manage and fetch product data.
   * @param {AuthService} authService - The authentication service.
   * @param {FormBuilder} formBuilder - The form builder for creating forms.
   */
  constructor(
    public orderService: OrderService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.productEditFormGroup = this.formBuilder.group({
      productName: ['', [Validators.required]],
      productPrice: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      productSize: ['', [Validators.required, Validators.pattern(/^\d+\s*\s*x\s*\d+\s*\s*x\s*\d+\s*$/)]],
      productMaterial: ['', Validators.required],
      productDescription: ['', Validators.required],
      productFileRef: ['', Validators.required],
      productImage: ['', Validators.required],
    });
    this.fetchProducts();
  }

  /**
   * Initializes the component.
   * Loads all items and fetches the product list.
   */
  ngOnInit(): void {
    this.orderService.loadAllItems();
    this.fetchProducts();
  }

  /**
   * Fetches the list of products from the order service.
   */
  fetchProducts(): void {
    this.orderService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.orderService.totalItems = data.length;
      },
      error: (err) => console.error('Error fetching products', err)
    });
  }

  /**
   * Handles changes to the number of items displayed per page.
   * 
   * @param {number} newSize - The new number of items to display per page.
   */
  onItemsPerPageChange(newSize: number): void {
    this.orderService.itemsPerPage = newSize;
    this.orderService.currentPage = 1; // Reset to first page
    this.fetchProducts();
  }

  /**
   * Opens the edit modal with the selected product.
   * 
   * @param {Item} product - The product to edit.
   */
  openEditModal(product: Item): void {
    this.selectedProduct = Object.assign({}, product);
    this.isModalOpen = true;
  }

  /**
   * Closes the modal.
   */
  closeModal(): void {
    this.isModalOpen = false;
  }

  /**
   * Saves changes to the product.
   * Handles form validation and calls the appropriate service method for adding or updating a product.
   */
  saveChanges(): void {
    this.errorMsg = "";
    if (!this.productEditFormGroup.valid) {
      switch ("INVALID") {
        case this.productEditFormGroup.controls['productName'].status:
          this.errorMsg = "Product name is empty.";
          break;
        case this.productEditFormGroup.controls['productPrice'].status:
          this.errorMsg = "Product price is invalid.";
          break;
        case this.productEditFormGroup.controls['productSize'].status:
          this.errorMsg = "Product size is invalid. It should be ? x ? x ? (in millimeters)";
          break;
        case this.productEditFormGroup.controls['productMaterial'].status:
          this.errorMsg = "Product material is empty.";
          break;
        case this.productEditFormGroup.controls['productDescription'].status:
          this.errorMsg = "Product description is empty.";
          break;
        case this.productEditFormGroup.controls['productImage'].status:
          this.errorMsg = "Product image is empty.";
          break;
      }
      return;
    }
    if (this.isNewProduct) {
      this.orderService.createItem(<Item>this.selectedProduct);
    } else {
      this.orderService.updateItem(<Item>this.selectedProduct);
    }
    this.orderService.loadAllItems();
    this.closeModal();
  }

  /**
   * Deletes a product.
   * 
   * @param {number} id - The ID of the product to delete.
   */
  deleteItem(id: number): void {
    this.orderService.deleteItem(id);
    this.fetchProducts();
  }

  /**
   * Toggles the modal open or closed.
   * 
   * @param {boolean} open - True to open the modal, false to close it.
   */
  toggleModal(open: boolean): void {
    this.isModalOpen = open;
  }

  /**
   * Handles file input change event.
   * 
   * @param {Event} event - The file input change event.
   */
  handleFileInput(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let files: FileList | null = element.files;
    if (files) {
      console.log('Selected file:', files[0]);
    }
  }

  /**
   * Opens the add product modal with a new product form.
   */
  openAddProductModal(): void {
    this.selectedProduct = { item_id: 0, name: '', cost: 0, dimensions: '', material: '', description: '', est_time: 0, file_ref: "", image_url: "" };
    this.isModalOpen = true;
    this.isNewProduct = true;
  }
}

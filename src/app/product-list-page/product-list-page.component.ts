import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
//import { Router } from "@angular/router";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { OrderService } from '../shared/services/order.service';
import { Item } from '../shared/interfaces/item';
import { AuthService } from '../shared/services/auth.service';

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
  selectedProduct: Item = { item_id: 0, name: '', cost: 0, dimensions: '', material: '' , description:'', est_time: 0, file_ref: "", image_url: ""}; // Example initialization
  isModalOpen = false;
  isNewProduct: boolean = false;
  productEditFormGroup: FormGroup;
  errorMsg: string = "";

  products: Item[] = [];


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

  ngOnInit(): void {
    this.orderService.loadAllItems();
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.orderService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.orderService.totalItems = data.length;
      },
      error: (err) => console.error('Error fetching products', err)
    });
  }

  onItemsPerPageChange(newSize: number): void {
    this.orderService.itemsPerPage = newSize;
    this.orderService.currentPage = 1; // Reset to first page
    this.fetchProducts();
  }

  openEditModal(product: Item): void {
    this.selectedProduct = Object.assign({}, product);
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveChanges(): void {
    this.errorMsg = "";
    if (!this.productEditFormGroup.valid) {
      console.log(this.productEditFormGroup)
      console.log("not valid")
      switch ("INVALID") {
        case this.productEditFormGroup.controls['productName'].status:
          this.errorMsg = "Product name is empty.";
          break;
        case this.productEditFormGroup.controls['productPrice'].status:
          this.errorMsg = "Product privce is invalid.";
          break;
        case this.productEditFormGroup.controls['productSize'].status:
          console.log(this.productEditFormGroup.controls['productSize'])
          this.errorMsg = "Product size is invalid. It should by ? x ? x ? (in millimeters)";
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

  deleteItem(id: number): void {
    this.orderService.deleteItem(id);
    this.fetchProducts();
  }

  toggleModal(open: boolean): void {
    this.isModalOpen = open;
  }

  handleFileInput(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let files: FileList | null = element.files;
    if (files) {
      console.log('Selected file:', files[0]);
    }
  }

  openAddProductModal(): void {
    this.selectedProduct = { item_id: 0, name: '', cost: 0, dimensions: '', material: '' , description:'', est_time: 0, file_ref: "", image_url: ""};
    this.isModalOpen = true;
    this.isNewProduct = true;
  }

  

}

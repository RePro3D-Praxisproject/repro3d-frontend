import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
//import { Router } from "@angular/router";
import { Product } from "../product-card/product-card.component";
import { ProductDataService } from '../product/service/product-data.service';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'] // Corrected from 'styleUrl' to 'styleUrls' and expects an array
})

export class ProductListPageComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: { material: string; price: number; title: string; dimensions: string; description: string; } = { title: '', price: 0, dimensions: '', material: '' , description:''}; // Example initialization
  isModalOpen = false; // Controls the modal visibility
  protected isNewProduct: boolean = false;

  constructor(
    private productDataService: ProductDataService
  ) {}

  ngOnInit(): void {
    this.products = this.productDataService.getAllProducts();
  }

  openEditModal(product: Product): void {
    this.selectedProduct = Object.assign({}, product);
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }
  saveChanges(): void {
    // Implement saving logic here
    this.toggleModal(false); // Close the modal after saving changes
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


  deleteProduct(product: Product): void {
    if (confirm("Are you sure you want to delete this product?")) {
      const index = this.products.indexOf(product);
      if (index > -1) {
        this.products.splice(index, 1); // Removes the product from the array

        // Optionally, call a service to delete from the backend
        // this.productDataService.deleteProduct(product.id).subscribe({
        //   next: () => console.log('Product deleted successfully'),
        //   error: (err) => console.error('Error deleting product:', err)
        // });
      }
    }
  }

  openAddProductModal(): void {
    this.selectedProduct = { title: '', price: 0, dimensions: '', material: '', description:'' };
    this.isModalOpen = true;
    this.isNewProduct = true;
  }

  addProduct(): void {
    this.products.push(<Product>this.selectedProduct);
    this.closeModal();
    // Optionally, send the new product to the backend and refresh the list
  }

}

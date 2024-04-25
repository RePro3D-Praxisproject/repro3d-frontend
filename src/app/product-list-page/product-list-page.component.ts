import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
//import { Router } from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { OrderService } from '../shared/services/order.service';
import { Item } from '../shared/interfaces/item';

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
  styleUrls: ['./product-list-page.component.scss']
})

export class ProductListPageComponent implements OnInit {
  products: Item[] = [];
  selectedProduct: { material: string; price: number; title: string; dimensions: string; description: string; } = { title: '', price: 0, dimensions: '', material: '' , description:''}; // Example initialization
  isModalOpen = false;
  isNewProduct: boolean = false;

  constructor(
    protected orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.products = this.orderService.getAllProducts();
  }

  openEditModal(product: Item): void {
    this.selectedProduct = Object.assign({}, product);
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveChanges(): void {
    if (this.isNewProduct) {
      this.orderService.createItem(<Item>this.selectedProduct);
    } else {
      this.orderService.updateItem(<Item>this.selectedProduct);
    }
    this.products = this.orderService.getAllProducts();
    this.closeModal();
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
    this.selectedProduct = { title: '', price: 0, dimensions: '', material: '', description:'' };
    this.isModalOpen = true;
    this.isNewProduct = true;
  }



}

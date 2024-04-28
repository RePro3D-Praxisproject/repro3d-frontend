import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
//import { Router } from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
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
    NgIf
  ],
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss']
})

export class ProductListPageComponent implements OnInit {
  selectedProduct: { material: string; cost: number; name: string; dimensions: string; description: string; } = { name: '', cost: 0, dimensions: '', material: '' , description:''}; // Example initialization
  isModalOpen = false;
  isNewProduct: boolean = false;

  constructor(
    public orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.orderService.loadAllItems();
    console.log(this.authService.getMyRole())
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
    this.orderService.loadAllItems();
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
    this.selectedProduct = { name: '', cost: 0, dimensions: '', material: '', description:'' };
    this.isModalOpen = true;
    this.isNewProduct = true;
  }



}

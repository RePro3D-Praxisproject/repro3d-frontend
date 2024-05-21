import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { OrderService } from '../shared/services/order.service';
import { NgForOf, SlicePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

/**
 * Component for displaying a catalogue of products.
 * Allows pagination and selecting the number of items per page.
 */
@Component({
  selector: 'app-product-catalogue',
  standalone: true,
  templateUrl: './product-catalogue.component.html',
  styleUrl: './product-catalogue.component.scss',
  imports: [
    ProductCardComponent,
    NgForOf,
    HttpClientTestingModule,
    SlicePipe,
    FormsModule
  ]
})
export class ProductCatalogueComponent implements OnInit {

  /**
   * Constructs the ProductCatalogueComponent.
   * 
   * @param {OrderService} orderService - The service to manage and fetch product data.
   */
  constructor(public orderService: OrderService) {}

  /**
   * Initializes the component.
   * Loads all items using the order service.
   */
  ngOnInit(): void {
    this.orderService.loadAllItems();
  }

  /**
   * Handles changes to the number of items displayed per page.
   * Resets the current page to 1 when the items per page is changed.
   * 
   * @param {number} newSize - The new number of items to display per page.
   */
  onItemsPerPageChange(newSize: number): void {
    this.orderService.itemsPerPage = newSize;
    this.orderService.currentPage = 1;
  }
}

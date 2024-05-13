import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { OrderService } from '../shared/services/order.service';
import { NgForOf, SlicePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-product-catalogue',
    standalone: true,
    templateUrl: './product-catalogue.component.html',
    styleUrl: './product-catalogue.component.scss',
    imports: [ProductCardComponent, NgForOf, HttpClientTestingModule, SlicePipe, FormsModule]
})
export class ProductCatalogueComponent implements OnInit {
  constructor (public orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.loadAllItems()
  }
  
  onItemsPerPageChange(newSize: number): void {
    this.orderService.itemsPerPage = newSize;
    this.orderService.currentPage = 1;
  }
}

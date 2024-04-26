import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { OrderService } from '../shared/services/order.service';
import { NgForOf } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
    selector: 'app-product-catalogue',
    standalone: true,
    templateUrl: './product-catalogue.component.html',
    styleUrl: './product-catalogue.component.scss',
    imports: [ProductCardComponent, NgForOf, HttpClientTestingModule]
})
export class ProductCatalogueComponent implements OnInit {
  constructor (public orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.loadAllItems()
  }
  
}

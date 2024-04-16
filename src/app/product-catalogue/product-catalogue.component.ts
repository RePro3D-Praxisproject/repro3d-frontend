import { Component } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { OrderService } from '../../services/order-service.service';
import { NgForOf } from '@angular/common';

@Component({
    selector: 'app-product-catalogue',
    standalone: true,
    templateUrl: './product-catalogue.component.html',
    styleUrl: './product-catalogue.component.scss',
    imports: [ProductCardComponent, NgForOf]
})
export class ProductCatalogueComponent {
  constructor (public orderService: OrderService) {}

  
}

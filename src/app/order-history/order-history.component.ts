import { Component, OnInit } from '@angular/core';
import { OrderService } from "../shared/services/order.service";
import { Order } from '../shared/interfaces/order';
import { NgFor } from '@angular/common';
import { OrderItemsComponent } from "./order-items/order-items.component";

@Component({
    selector: 'app-order-history',
    standalone: true,
    templateUrl: './order-history.component.html',
    styleUrl: './order-history.component.scss',
    imports: [NgFor, OrderItemsComponent]
})
export class OrderHistoryComponent implements OnInit{

  orders: Order[] = [];

  constructor(public orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrdersByEmail("mahli@posteo.net").subscribe(
      res => {
        this.orders = res.data;
        console.log(this.orders)
      }
    )
  }


  
}

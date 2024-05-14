import { Component, OnInit } from '@angular/core';
import { OrderService } from "../shared/services/order.service";
import { Order } from '../shared/interfaces/order';
import { NgFor, NgIf } from '@angular/common';
import { OrderItemsComponent } from "./order-items/order-items.component";

@Component({
    selector: 'app-order-history',
    standalone: true,
    templateUrl: './order-history.component.html',
    styleUrl: './order-history.component.scss',
    imports: [NgFor, OrderItemsComponent, NgIf]
})
export class OrderHistoryComponent implements OnInit{

  orders: Order[] = [];

  constructor(public orderService: OrderService
  ) {
    this.orderService.loadAllOrders();
  }

  ngOnInit(): void {
    this.orderService.getOrdersByEmail(localStorage.getItem("email")!).subscribe(
      res => {
        this.orders = res.data;
      }
    )
  }


  
}

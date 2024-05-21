import { Component, OnInit } from '@angular/core';
import { OrderService } from "../shared/services/order.service";
import { Order } from '../shared/interfaces/order';
import { NgFor, NgIf } from '@angular/common';
import { OrderItemsComponent } from "./order-items/order-items.component";

/**
 * Component for displaying the order history of a user.
 * Retrieves and displays a list of orders associated with the user's email.
 */
@Component({
  selector: 'app-order-history',
  standalone: true,
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss',
  imports: [NgFor, OrderItemsComponent, NgIf]
})
export class OrderHistoryComponent implements OnInit {

  /** List of orders made by the user. */
  orders: Order[] = [];

  /**
   * Constructs the OrderHistoryComponent.
   * 
   * @param {OrderService} orderService - The order service to retrieve orders.
   */
  constructor(public orderService: OrderService) {
    this.orderService.loadAllOrders();
  }

  /**
   * Initializes the component.
   * Retrieves orders associated with the user's email and updates the orders array.
   */
  ngOnInit(): void {
    this.orderService.getOrdersByEmail(localStorage.getItem("email")!).subscribe(
      res => {
        this.orders = res.data;
      }
    );
  }
}

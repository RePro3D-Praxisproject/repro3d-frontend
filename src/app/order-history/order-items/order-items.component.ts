import { Component, Input, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { Order } from '../../shared/interfaces/order';
import { OrderItems } from '../../shared/interfaces/order-items';
import { Item } from '../../shared/interfaces/item';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { API_URL } from '../../shared/constants/apiurl.constant';

/**
 * Component for displaying items in an order.
 * Fetches and displays details of each item in the order.
 */
@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [NgFor, CommonModule, RouterLink],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class OrderItemsComponent implements OnInit {

  /** The order whose items are to be displayed. */
  @Input() order!: Order;

  /** List of order items for the specified order. */
  public orderItems!: OrderItems[];

  /** List of items corresponding to the order items. */
  public items: Item[] = [];

  /** Base URL for API calls. */
  public API_URL = API_URL;

  /** Flag to indicate if the webcam is on or off. */
  public isWebcamOn = false;

  /**
   * Constructs the OrderItemsComponent.
   * 
   * @param {OrderService} orderService - The order service to retrieve order items and item details.
   */
  constructor(public orderService: OrderService) {}

  /**
   * Initializes the component.
   * Fetches order items for the specified order and retrieves details for each item.
   */
  ngOnInit(): void {
    this.orderService.getOrderItemsByOrder(this.order).subscribe(
      res => {
        this.orderItems = res.data;
        console.log(this.orderItems);
        if (this.orderItems != null) {
          for (let orderItem of this.orderItems) {
            this.orderService.getItemByIdAsync(orderItem.item.item_id).subscribe(
              res => {
                this.items.push(res.data);
                console.log(this.orderItems);
              }
            );
          }
        }
      }
    );
  }

  /**
   * Toggles the state of the webcam.
   */
  toggleWebcam(): void {
    this.isWebcamOn = !this.isWebcamOn;
  }
}

import { Component, Input, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { Order } from '../../shared/interfaces/order';
import { OrderItems } from '../../shared/interfaces/order-items';
import { Item } from '../../shared/interfaces/item';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { API_URL } from '../../shared/constants/apiurl.constant';

@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [NgFor, CommonModule, RouterLink],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class OrderItemsComponent implements OnInit {

  @Input() order!: Order;
  public orderItems!: OrderItems[];
  public items: Item[] = [];
  public API_URL = API_URL;
  public isWebcamOn = false;
  constructor(public orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrderItemsByOrder(this.order).subscribe(
      res => {
        this.orderItems = res.data;
        if (this.orderItems != null) {
          for (let orderItem of this.orderItems) {
            this.orderService.getItemByIdAsync(orderItem.item.item_id).subscribe(
              res => {
                this.items.push(res.data);
                console.log(this.orderItems)
              }
            )
          }
        }
      }
      
    );
  }

  toggleWebcam(): void {
    this.isWebcamOn = !this.isWebcamOn;
  }
}

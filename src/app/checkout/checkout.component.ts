import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../shared/interfaces/item';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../shared/services/order.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  product!: Item;
  userData = JSON.parse(localStorage.getItem('userdata')!);

  constructor(
    private route: ActivatedRoute,
    public orderService: OrderService
  ) {}

  ngOnInit(): void {
    
    const productId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.orderService.getItemByIdAsync(productId).subscribe(
      p => {
        this.product = p.data;
      }
    )
  }

  placeOrder() {
    this.orderService.createOrder(this.product).subscribe(
      _ => {
        console.log("Order Placed")
      }
    )
  }
}

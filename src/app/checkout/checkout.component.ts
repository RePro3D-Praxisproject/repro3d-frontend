import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../shared/interfaces/item';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../shared/services/order.service';
import { NgIf } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  product!: Item;
  userData = JSON.parse(localStorage.getItem('userdata')!);
  checkoutForm = this.formBuilder.group({
    redeem_code: ''
  });
  errorMsg: string = "";
  successMsg: string = "";
  constructor(
    private route: ActivatedRoute,
    public orderService: OrderService,
    private formBuilder: FormBuilder
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
    this.errorMsg = "";
    this.successMsg = ""
    this.orderService.createOrder([this.product], this.checkoutForm.getRawValue().redeem_code!).subscribe(
      _ => {
        this.successMsg = "Order successfully placed."
      },
      error => {
        this.errorMsg = error.error.message;
      }
    )
  }
}

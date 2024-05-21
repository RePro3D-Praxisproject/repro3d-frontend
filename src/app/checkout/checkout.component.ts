import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../shared/interfaces/item';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../shared/services/order.service';
import { NgIf } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Component for the checkout process.
 * Handles displaying the product and placing an order.
 */
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

  /** The product to be ordered. */
  product!: Item;

  /** User data stored in local storage. */
  userData = JSON.parse(localStorage.getItem('userdata')!);

  /** Form group for the checkout form. */
  checkoutForm = this.formBuilder.group({
    redeem_code: ''
  });

  /** Error message for invalid redeem codes. */
  errorMsg: string = "";

  /** Success message for successfully placed orders. */
  successMsg: string = "";

  /**
   * Constructs the CheckoutComponent.
   * 
   * Injected dependencies:
   * @param {ActivatedRoute} route - The activated route to get route parameters.
   * @param {OrderService} orderService - The order service to manage orders.
   * @param {FormBuilder} formBuilder - The form builder for creating forms.
   * @param {Router} router - The router for navigation.
   */
  constructor(
    private route: ActivatedRoute,
    public orderService: OrderService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetches the product details using the route parameter.
    const productId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.orderService.getItemByIdAsync(productId).subscribe(
      p => {
        this.product = p.data;
      }
    )
  }

  /**
   * Places an order for the product.
   * Displays a success message and navigates to the order history page.
   * Displays an error message if the redeem code is invalid.
   */
  placeOrder() {
    this.errorMsg = "";
    this.successMsg = ""
    this.orderService.createOrder([this.product], this.checkoutForm.getRawValue().redeem_code!).subscribe(
      _ => {
        this.successMsg = "Order successfully placed."
        setTimeout(() => {
          this.router.navigate(['history']);
        }, 3000);
      },
      error => {
        this.errorMsg = "Redeem code is invalid.";
      }
    )
  }
}

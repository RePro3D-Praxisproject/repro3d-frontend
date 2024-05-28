import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { NgForOf, NgIf } from "@angular/common";
import { ActivatedRoute, RouterLink, RouterLinkActive } from "@angular/router";
import { Item } from '../shared/interfaces/item';
import { OrderService } from '../shared/services/order.service';
import { AuthService } from '../shared/services/auth.service';

/**
 * Component for displaying a single product.
 * Shows product details and provides a checkout option if the user is logged in.
 */
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    NgForOf,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  /** The product to be displayed. */
  product?: Item;

  /**
   * Constructs the ProductComponent.
   * 
   * @param {ActivatedRoute} route - The active route to extract route parameters.
   * @param {OrderService} orderService - The service to retrieve product details.
   * @param {AuthService} authService - The service to check authentication status.
   */
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    public authService: AuthService
  ) {}

  /**
   * Initializes the component.
   * Retrieves the product ID from the route and fetches the product details.
   */
  public ngOnInit(): void {
    const productIdString = this.route.snapshot.paramMap.get('id');
    if (productIdString) {
      const productId = +productIdString;
      this.product = this.orderService.getProductById(productId);
    }
  }
}

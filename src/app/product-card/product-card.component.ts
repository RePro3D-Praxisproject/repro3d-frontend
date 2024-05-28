import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Item } from "../shared/interfaces/item";
import { AuthService } from '../shared/services/auth.service';
import { NgIf } from '@angular/common';

/**
 * Component for displaying a product card.
 * Includes product details and options to proceed to checkout or view more details.
 */
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProductCardComponent {

  /** The product to be displayed in the card. */
  @Input({ required: true }) product!: Item;

  /**
   * Constructs the ProductCardComponent.
   * 
   * @param {AuthService} authService - The authentication service to check login status.
   */
  constructor(public authService: AuthService) { }
}

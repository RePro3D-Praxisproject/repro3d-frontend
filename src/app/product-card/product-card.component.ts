import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {FormsModule} from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Item } from "../../interfaces/item";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProductCardComponent {

  @Input({required: true}) product!: Item;

  constructor() { }

}

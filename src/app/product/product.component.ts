import {Component, Input, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import { Item } from '../shared/interfaces/item';
import { OrderService } from '../shared/services/order.service';




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
export class ProductComponent implements OnInit{
  product?: Item;


  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const productIdString = this.route.snapshot.paramMap.get('id');
    if (productIdString) {
      const productId = +productIdString;
      this.product = this.orderService.getProductById(productId);
    }
  }
}

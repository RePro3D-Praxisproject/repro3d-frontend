import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../product-card/product-card.component";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {ProductDataService} from "./service/product-data.service";



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
  product?: Product;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductDataService
  ) {}

  ngOnInit(): void {
    const productIdString = this.route.snapshot.paramMap.get('id');
    if (productIdString) {
      const productId = +productIdString; // Convert string to number
      this.product = this.productService.getProductById(productId);
    }
  }
}

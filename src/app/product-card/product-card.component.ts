import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
export interface Product {
  id: number;
  title: string;
  price: number;
  buildTime: string;
  material: string;
  dimensions: string;
  imgUrl: string;
  description: string;
}
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    NgForOf,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  searchTerm: string = '';


  products: Product[] = [
    { id: 1, title: 'ReProRing', price: 126, buildTime: 'est. 1 Hour', material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/picture-page.png', description:"This ring is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that" },
    { id: 2, title: 'skull', price: 126, buildTime: 'est. 1 Hour', material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/skull-picture.jpg', description:"This skull is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that" },

    { id: 3, title: 'John the thinker', price: 126, buildTime: 'est. 1 Hour', material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/john-picture.jpg', description:"This john is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that" },
    { id: 4, title: 'baby yoda', price: 150, buildTime: 'est. 2 Hour', material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/babyYoda-picture.jpg', description:"This baby yoda is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that" },
    { id: 5, title: 'dice', price: 140, buildTime: 'est. 3 Hour', material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/dice-picture.jpg', description:"This dice is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that" },


  ];


  get filteredProducts(): Product[] {
    return this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  constructor(
    public router: Router
  ) { }
  ngOnInit(): void {
  }

}

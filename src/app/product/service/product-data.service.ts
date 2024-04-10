// product-data.service.ts
import { Injectable } from '@angular/core';
import {Product} from "../../product-card/product-card.component";

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  private products: Product[] = [
    { id: 1, title: 'ReProRing', price: 126, buildTime: 'est. 1 Hour', material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/picture-page.png' , description:"This ring is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that" },
    { id: 2, title: 'skull', price: 126, buildTime: 'est. 1 Hour', material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/skull-picture.jpg' , description:"This skull is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that" },

    { id: 3, title: 'John the thinker', price: 126, buildTime: 'est. 1 Hour', material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/john-picture.jpg', description:"This john is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that" },
    { id: 4, title: 'baby yoda', price: 150, buildTime: 'est. 2 Hour', material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/babyYoda-picture.jpg', description:"This baby yoda is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that" },
    { id: 5, title: 'dice', price: 140, buildTime: 'est. 3 Hour', material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/dice-picture.jpg' , description:"This dice is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that"},

  ];

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }
}

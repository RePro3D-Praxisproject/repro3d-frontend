import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class OrderService {

    constructor(private httpClient: HttpClient) {}

    public products: Item[] = [
        { itemId: 1, title: 'ReProRing', price: 126, buildTime: 60, material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/picture-page.png' , description:"This ring is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that" },
        { itemId: 2, title: 'skull', price: 126, buildTime: 60, material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/skull-picture.jpg' , description:"This skull is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that" },
        { itemId: 3, title: 'John the thinker', price: 126, buildTime: 60, material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/john-picture.jpg', description:"This john is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that" },
        { itemId: 4, title: 'baby yoda', price: 150, buildTime: 120, material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/babyYoda-picture.jpg', description:"This baby yoda is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that" },
        { itemId: 5, title: 'dice', price: 140, buildTime: 180, material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/dice-picture.jpg' , description:"This dice is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that"},

    ];

    public updateItem(item: Item): void {
      const index = this.products.findIndex(prod => prod.itemId === item.itemId);
      if (index !== -1) {
        this.products[index] = item;
      }
    }

    public createItem(newItem: Item): void {
       this.products.push(newItem)
    }

    public getItemByName(name: String):Item | undefined{
        return this.products.find(item => item.title.toLowerCase() === name.toLowerCase())
    }

    public deleteItem(id: number):void{
        const index = this.products.findIndex(item =>item.itemId===id)
        if(index > -1){
          this.products.splice(index,1)
        }

    }


    getProductById(id: number): Item | undefined {
        return this.products.find(product => product.itemId === id);
    }

    getAllProducts(): Item[] {
        return this.products;
    }
}

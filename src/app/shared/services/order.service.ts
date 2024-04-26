import { Injectable } from '@angular/core';
import { Item, ItemResponse } from '../interfaces/item';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/apiurl.constant';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

    constructor(private http: HttpClient) {}

    public products: Item[] = [
        { item_id: 1, title: 'ReProRing', price: 126, est_time: 60, material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/picture-page.png' , description:"This ring is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that" },
        { item_id: 2, title: 'skull', price: 126, est_time: 60, material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/skull-picture.jpg' , description:"This skull is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that" },
        { item_id: 3, title: 'John the thinker', price: 126, est_time: 60, material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/john-picture.jpg', description:"This john is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that" },
        { item_id: 4, title: 'baby yoda', price: 150, est_time: 120, material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/babyYoda-picture.jpg', description:"This baby yoda is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that" },
        { item_id: 5, title: 'dice', price: 140, est_time: 180, material: 'ABS', dimensions: '209 x 209 x 400', imgUrl: 'assets/dice-picture.jpg' , description:"This dice is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that"},

    ];

    public updateItem(item: Item): void {
      this.http.put(`${API_URL}/${item.item_id}`, item).subscribe(
        _ => {
          this.loadAllItems();
        }
      );
    }

    public createItem(newItem: Item): void {
      this.http.post(`${API_URL}`, newItem).subscribe(
        _ => {
          this.loadAllItems();
        }
      );
    }

    public getItemByName(name: String):Item | undefined{
        return this.products.find(item => item.title.toLowerCase() === name.toLowerCase())
    }

    public deleteItem(id: number):void{
        const index = this.products.findIndex(item =>item.item_id===id)
        if(index > -1){
          this.products.splice(index,1)
        }

    }

    public loadAllItems(): void {
      this.http.get<ItemResponse>(`${API_URL}/item`).subscribe(
        items =>  {
          this.products = items.data;
          console.log(this.products)
        }
      )
    }

    getProductById(id: number): Item | undefined {
        return this.products.find(product => product.item_id === id);
    }

    getAllProducts(): Item[] {
        return this.products;
    }
}

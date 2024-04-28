import { Injectable } from '@angular/core';
import { Item, ItemResponse } from '../interfaces/item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../constants/apiurl.constant';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

    constructor(private http: HttpClient, private authService: AuthService) {}

    public products: Item[] = [
        {
          item_id: 1, name: 'ReProRing', cost: 126, est_time: 60, material: 'ABS', dimensions: '209 x 209 x 400', description: "This ring is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that",
          file_ref: ''
        },
        {
          item_id: 2, name: 'skull', cost: 126, est_time: 60, material: 'ABS', dimensions: '209 x 209 x 400', description: "This skull is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that",
          file_ref: ''
        },
        {
          item_id: 3, name: 'John the thinker', cost: 126, est_time: 60, material: 'ABS', dimensions: '209 x 209 x 400', description: "This john is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that",
          file_ref: ''
        },
        {
          item_id: 4, name: 'baby yoda', cost: 150, est_time: 120, material: 'ABS', dimensions: '209 x 209 x 400', description: "This baby yoda is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that",
          file_ref: ''
        },
        {
          item_id: 5, name: 'dice', cost: 140, est_time: 180, material: 'ABS', dimensions: '209 x 209 x 400', description: "This dice is the first product of the ReProd3d production and have so much value to us! if you print this item you will get 50 percent discount for that",
          file_ref: ''
        },

    ];

    public updateItem(item: Item): void {
      if (!this.authService.isLoggedIn()) {
        return;
      }
      const headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')),
        'Content-Type': 'application/json'
      });
      console.log(item)
      this.http.put(`${API_URL}/item/${item.item_id}`, item, {headers: headers}).subscribe(
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
        return this.products.find(item => item.name.toLowerCase() === name.toLowerCase())
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

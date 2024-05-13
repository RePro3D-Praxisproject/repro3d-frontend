import { Injectable } from '@angular/core';
import { Item, ItemResponse } from '../interfaces/item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../constants/apiurl.constant';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

    constructor(private http: HttpClient, private authService: AuthService) {}

    public products: Item[] = [];
    public itemsPerPage: number = 10;
    public currentPage: number = 1;
    public totalItems: number = 0; 

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

    /**
     * Creates a new item.
     * @param newItem {Item} The new item to be created
     */
    public createItem(newItem: Item): void {
      this.http.post(`${API_URL}/item`, newItem).subscribe(
        _ => {
          this.loadAllItems();
        }
      );
    }

    /**
     * Gets an item based on the name/title.
     * @param name {String} The name of the item to get.
     * @returns {Item | undefined}
     */
    public getItemByName(name: String):Item | undefined{
        return this.products.find(item => item.name.toLowerCase() === name.toLowerCase())
    }

    public deleteItem(id: number):void{
      this.http.delete(`${API_URL}/item/${id}`).subscribe(
         _ =>  {
          this.loadAllItems();
        }
      )

    }

    public loadAllItems(): void {
      this.http.get<ItemResponse>(`${API_URL}/item`).subscribe(
        items =>  {
          this.products = items.data;
          this.totalItems = this.products.length
          console.log(this.products)
        }
      )
    }

    public getItemByIdAsync(id: number): Observable<any> {
      return this.http.get<ItemResponse>(`${API_URL}/item/${id}`);
    }


    getProductById(id: number): Item | undefined {
        return this.products.find(product => product.item_id === id);
    }

    getAllProducts(): Observable<Item[]> {
        return of(this.products);
    }

    createOrder(products: Item[], redeem_code: string): Observable<any> {
      const requestBody = {
        order: {
          orderDate: new Date().toISOString().slice(0, 10),
          user_id: JSON.parse(localStorage.getItem('userdata')!).data.userId,
          redeemCode: redeem_code
        },
        items: products
      }
      return this.http.post<any>(`${API_URL}/order/place`, requestBody);
    }
}

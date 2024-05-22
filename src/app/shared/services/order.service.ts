import { Injectable } from '@angular/core';
import { Item, ItemResponse } from '../interfaces/item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../constants/apiurl.constant';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { Order, OrderResponse } from '../interfaces/order';
import { OrderItems } from '../interfaces/order-items';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  public products: Item[] = [];
  public orders: Order[] = [];
  public itemsPerPage: number = 10;
  public currentPage: number = 1;
  public totalItems: number = 0;

  /**
   * Constructs the OrderService.
   * 
   * @param {HttpClient} http - The HTTP client for making requests.
   * @param {AuthService} authService - The authentication service.
   */
  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Updates an existing item.
   * 
   * @param {Item} item - The item to update.
   */
  public updateItem(item: Item): void {
    if (!this.authService.isLoggedIn()) {
      return;
    }
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')),
      'Content-Type': 'application/json'
    });
    this.http.put(`${API_URL}/item/${item.item_id}`, item, { headers: headers }).subscribe(
      _ => {
        this.loadAllItems();
      }
    );
  }

  /**
   * Retrieves orders by email.
   * 
   * @param {String} email - The email of the user.
   * @returns {Observable<any>} - Observable containing the order response.
   */
  public getOrdersByEmail(email: String): Observable<any> {
    return this.http.get<OrderResponse>(`${API_URL}/order/email?email=${email}`);
  }

  /**
   * Creates a new item.
   * 
   * @param {Item} newItem - The new item to be created.
   */
  public createItem(newItem: Item): void {
    this.http.post(`${API_URL}/item`, newItem).subscribe(
      _ => {
        this.loadAllItems();
      }
    );
  }

  /**
   * Retrieves an item by its name.
   * 
   * @param {String} name - The name of the item.
   * @returns {Item | undefined} - The item if found, otherwise undefined.
   */
  public getItemByName(name: String): Item | undefined {
    return this.products.find(item => item.name.toLowerCase() === name.toLowerCase());
  }

  /**
   * Deletes an item by its ID.
   * 
   * @param {number} id - The ID of the item to delete.
   */
  public deleteItem(id: number): void {
    this.http.delete(`${API_URL}/item/${id}`).subscribe(
      _ => {
        this.loadAllItems();
      }
    );
  }

  /**
   * Loads all items.
   */
  public loadAllItems(): void {
    this.http.get<ItemResponse>(`${API_URL}/item`).subscribe(
      items => {
        this.products = items.data;
        this.totalItems = this.products.length;
      }
    );
  }

  /**
   * Loads all orders.
   */
  public loadAllOrders(): void {
    this.http.get<OrderResponse>(`${API_URL}/order/email?email=${localStorage.getItem('email')}`).subscribe(
      res => {
        this.orders = res.data;
        if (this.orders !== null) {
          for (let o of this.orders) {
            if (o.redeemCode !== null) {
              console.log(o.redeemCode.rcCode);
            }
          }
        }
      }
    );
  }

  /**
   * Retrieves an item by its ID asynchronously.
   * 
   * @param {number} id - The ID of the item.
   * @returns {Observable<any>} - Observable containing the item response.
   */
  public getItemByIdAsync(id: number): Observable<any> {
    return this.http.get<ItemResponse>(`${API_URL}/item/${id}`);
  }

  /**
   * Retrieves a product by its ID.
   * 
   * @param {number} id - The ID of the product.
   * @returns {Item | undefined} - The product if found, otherwise undefined.
   */
  public getProductById(id: number): Item | undefined {
    return this.products.find(product => product.item_id === id);
  }

  /**
   * Retrieves all products as an observable.
   * 
   * @returns {Observable<Item[]>} - Observable containing the list of products.
   */
  public getAllProducts(): Observable<Item[]> {
    return of(this.products);
  }

  /**
   * Creates an order.
   * 
   * @param {Item[]} products - The list of products to order.
   * @param {string} redeem_code - The redeem code for the order.
   * @returns {Observable<any>} - Observable containing the order creation result.
   */
  public createOrder(products: Item[], redeem_code: string): Observable<any> {
    const requestBody = {
      order: {
        orderDate: new Date().toISOString().slice(0, 10),
        user_id: JSON.parse(localStorage.getItem('userdata')!).data.userId,
        redeemCode: redeem_code
      },
      items: products
    };
    return this.http.post<any>(`${API_URL}/order/place`, requestBody);
  }

  /**
   * Retrieves the items for a given order.
   * 
   * @param {Order} order - The order for which to retrieve the items.
   * @returns {Observable<any>} - Observable containing the order items.
   */
  public getOrderItemsByOrder(order: Order): Observable<any> {
    return this.http.get<any>(`${API_URL}/order-item/by-order/${order.orderId}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../constants/apiurl.constant';
import { ConfigResponse } from '../interfaces/config-response';


@Injectable({
  providedIn: 'root'
})
export class WebshopService {
  /** URL to fetch the webshop configuration. */
  private configUrl = `${API_URL}/config/webshop_toggled`;

  /** BehaviorSubject to hold the current state of the webshop. */
  private isEnabledSource = new BehaviorSubject<boolean>(false);

  /**
   * Constructs the WebshopService.
   * 
   * @param {HttpClient} http - The HTTP client for making requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Loads the current state of whether the webshop is enabled.
   * 
   * @returns {Observable<boolean>} - Observable containing the enabled state.
   */
  loadWebshopEnabled(): Observable<boolean> {
    return this.http.get<ConfigResponse>(this.configUrl).pipe(
      map(cr => {
        const enabled = cr.data.value === "1";
        this.isEnabledSource.next(enabled);
        return enabled;
      }),
      catchError(error => {
        console.error("Error loading the webshop enabled state", error);
        return of(false);
      })
    );
  }

  /**
   * Toggles the state of the webshop.
   * 
   * @returns {Observable<boolean>} - Observable containing the new enabled state.
   */
  public toggleWebshop(): Observable<boolean> {
    return this.http.post<ConfigResponse>(this.configUrl, {
      key: "webshop_toggled",
      value: this.isEnabledSource.value ? "0" : "1"
    }).pipe(
      map(cr => {
        const enabled = cr.data.value === "1";
        this.isEnabledSource.next(enabled);
        return enabled;
      }),
      catchError(error => {
        console.error("Error toggling the webshop state", error);
        return of(false);
      })
    );
  }

  /**
   * Observable to get the current state of whether the webshop is enabled.
   * 
   * @returns {Observable<boolean>} - Observable containing the enabled state.
   */
  public get isEnabled(): Observable<boolean> {
    return this.isEnabledSource.asObservable();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../constants/apiurl.constant';

interface ConfigResponse {
    success: boolean,
    message: string,
    data: {
        id: number, key: string, value: string
    }
}

@Injectable({
    providedIn: 'root'
  })
  export class WebshopService {
    private configUrl = `${API_URL}/config/webshop_toggled`;
    private isEnabledSource = new BehaviorSubject<boolean>(false);
  
    constructor(private http: HttpClient) {}
  
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
  
    public get isEnabled(): Observable<boolean> {
      return this.isEnabledSource.asObservable();
    }
  }
  

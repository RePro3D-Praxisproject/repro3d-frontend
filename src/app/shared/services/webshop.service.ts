import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, defaultIfEmpty, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebshopService {
  private configUrl = '../../configs/webshop.json';
  constructor(private http: HttpClient) {}

  isWebshopEnabled(): Observable<boolean> {
    return this.http.get<{webshop_toggled: number}>(this.configUrl).pipe(
      map(config => config.webshop_toggled === 1),
      catchError(() => of(false)),
      defaultIfEmpty(false)
    );
  }
  
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { WebshopService } from '../services/webshop.service';

@Injectable({
  providedIn: 'root'
})
export class WebshopToggledGuard implements CanActivate {
  constructor(
    private webshopService: WebshopService, 
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.webshopService.loadWebshopEnabled().pipe(
      switchMap(isEnabled => {
        if (!isEnabled) {
          if (this.authService.isLoggedIn()) {
            const role = this.authService.getMyRole()?.roleId;
            this.router.navigate([role === 1 ? '/admin-dashboard' : '/webshop-offline']);
          } else {
            this.router.navigate(['/login']);
          }
          return of(false);
        }
        return of(true);
      })
    );
  }
}

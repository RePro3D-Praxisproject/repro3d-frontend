import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  canActivate(): Observable<boolean> {
    return this.webshopService.isWebshopEnabled().pipe(
      map(isEnabled => {
        if (!isEnabled) {
          if (this.authService.isLoggedIn()) {
            if (this.authService.getMyRole()?.roleId === 1) {
              this.router.navigate(['/admin-dashboard']);
            } else {
              this.router.navigate(['/webshop-offline']);
            }
          } else {
            this.router.navigate(['/login']);
          }
          return false;
        }
        return true;
      })
    );
  }
}

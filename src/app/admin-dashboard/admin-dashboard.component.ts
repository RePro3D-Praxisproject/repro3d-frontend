import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebshopService } from '../shared/services/webshop.service';
import { AuthService } from '../shared/services/auth.service';

/**
 * Component for the admin dashboard.
 * Handles webshop enabling/disabling and navigation between admin sites.
 */
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive]
})
export class AdminDashboardComponent implements OnInit {
  isWebshopEnabled: boolean = false;

  /**
   * Constructs the AdminDashboardComponent.
   * 
   * Injected dependencies:
   * @param {Router} router - The router for navigation.
   * @param {AuthService} authService - The authentication service.
   * @param {WebshopService} webshopService - The webshop service.
   */
  constructor(
    public router: Router,
    public authService: AuthService,
    public webshopService: WebshopService,
  ) {}

  ngOnInit() {
    // Subscribes to the webshop service to get the enabled state.
    this.webshopService.loadWebshopEnabled().subscribe(); 
    this.webshopService.isEnabled.subscribe(enabled => {
      this.isWebshopEnabled = enabled; 
    });
  }

  /**
   * Toggles the webshop state.
   * Shows an alert indicating the new state of the webshop.
   */
  toggleWebshop() {
    this.webshopService.toggleWebshop().subscribe({
      next: (enabled) => {
        alert(`Webshop is now ${enabled ? 'enabled' : 'disabled'}.`);
      },
      error: () => alert("Failed to toggle the webshop state.")
    });
  }
}


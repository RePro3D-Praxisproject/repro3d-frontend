import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebshopService } from '../shared/services/webshop.service';
import { AuthService } from '../shared/services/auth.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive]
})
export class AdminDashboardComponent implements OnInit {
  isWebshopEnabled: boolean = false;

  constructor(
    public router: Router,
    public authService: AuthService,
    public webshopService: WebshopService,
  ) {}

  ngOnInit() {
    this.webshopService.loadWebshopEnabled().subscribe(); 
    this.webshopService.isEnabled.subscribe(enabled => {
      this.isWebshopEnabled = enabled; 
    });
  }

  toggleWebshop() {
    this.webshopService.toggleWebshop().subscribe({
      next: (enabled) => {
        alert(`Webshop is now ${enabled ? 'enabled' : 'disabled'}.`);
      },
      error: () => alert("Failed to toggle the webshop state.")
    });
  }
}


import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgIf,
    
  ],
  
})
export class AdminDashboardComponent {
  constructor(
    public router: Router,
    public authService: AuthService
  ) { }
}

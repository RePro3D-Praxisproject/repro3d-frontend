import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import { AuthService } from '../../app/shared/services/auth.service';
import { NgIf } from '@angular/common';
import { AuthResponse } from '../shared/interfaces/auth-response';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgIf,
    
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  navbarOpen = false;
  dropdownOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn()
  }

  getUserData(): AuthResponse {
    return JSON.parse(localStorage.getItem('userdata')!);
  }

}

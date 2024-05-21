import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import { AuthService } from '../../app/shared/services/auth.service';
import { NgIf } from '@angular/common';
import { AuthResponse } from '../shared/interfaces/auth-response';

/**
 * Component for the header section of the application.
 * Handles navigation bar and dropdown menu toggling, user authentication status, and retrieving user data.
 */
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

  /** Indicates whether the navigation bar is open. */
  navbarOpen = false;

  /** Indicates whether the dropdown menu is open. */
  dropdownOpen = false;

  /**
   * Constructs the HeaderComponent.
   * 
   * Injected dependencies:
   * @param {Router} router - The router for navigation.
   * @param {AuthService} authService - The authentication service.
   */
  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    // Checks if the user is logged in.
    this.authService.isLoggedIn()
  }

  /**
   * Toggles the navigation bar open/close state.
   */
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  /**
   * Toggles the dropdown menu open/close state.
   */
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  /**
   * Retrieves user data from local storage.
   * 
   * @returns {AuthResponse} The user data.
   */
  getUserData(): AuthResponse {
    return JSON.parse(localStorage.getItem('userdata')!);
  }

}

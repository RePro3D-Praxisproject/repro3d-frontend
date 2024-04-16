import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {FooterComponent} from "./footer/footer.component";
import {ProductCardComponent} from "./product-card/product-card.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
//import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule,HeaderComponent, HomepageComponent, FooterComponent,ProductCardComponent,FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent {
  title = 'repro3d-frontend';
}

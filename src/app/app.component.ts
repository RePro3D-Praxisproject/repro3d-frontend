import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {FooterComponent} from "./footer/footer.component";
import {ProductCardComponent} from "./product-card/product-card.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {PrinterManagementComponent} from "./printer-management/printer-management.component";
import {RedeemCodeDashboardComponent} from "./redeem-code-dashboard/redeem-code-dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule,HeaderComponent, HomepageComponent, FooterComponent,ProductCardComponent,FormsModule, HttpClientModule, PrinterManagementComponent, RedeemCodeDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent {
  title = 'repro3d-frontend';
}

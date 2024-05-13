import { Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {ProductComponent} from "./product/product.component";
import {ProductListPageComponent} from "./product-list-page/product-list-page.component";
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';
import {PrinterManagementComponent} from "./printer-management/printer-management.component";
import { LoginComponent } from './login/login.component';
import {RedeemCodeDashboardComponent} from "./redeem-code-dashboard/redeem-code-dashboard.component";
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserGuard } from './shared/guards/user.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { WebshopToggledGuard } from './shared/guards/webshop-toggled.guard';
import { WebshopOfflineComponent } from './webshop-offline/webshop-offline.component';


export const routes: Routes = [
  {path: '', component: HomepageComponent , canActivate: [WebshopToggledGuard]},
  {path: 'products', component: ProductCatalogueComponent, canActivate: [WebshopToggledGuard] },
  {path: 'product-detail/:id', component: ProductComponent, canActivate: [WebshopToggledGuard]},
  {path: 'product-list', component: ProductListPageComponent, canActivate: [AdminGuard]},
  {path: 'printer-management', component: PrinterManagementComponent, canActivate: [AdminGuard]},
  {path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard]},
  {path: 'webshop-offline', component: WebshopOfflineComponent},
  {path: 'login', component: LoginComponent },
  {path: 'redeem-code', component: RedeemCodeDashboardComponent, canActivate: [AdminGuard]},
  {path: 'register', component: RegisterComponent },
  {path: 'checkout/:id', component: CheckoutComponent, canActivate: [AdminGuard, UserGuard, WebshopToggledGuard]}
];

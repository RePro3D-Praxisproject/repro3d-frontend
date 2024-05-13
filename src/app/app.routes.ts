import { Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {ProductCardComponent} from "./product-card/product-card.component";
import {ProductComponent} from "./product/product.component";
import {ProductListPageComponent} from "./product-list-page/product-list-page.component";
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';
import {PrinterManagementComponent} from "./printer-management/printer-management.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserGuard } from './shared/guards/user.guard';


export const routes: Routes = [
  {path: '', component: HomepageComponent  },
  {path: 'products', component: ProductCatalogueComponent },
  {path: 'product-detail/:id', component: ProductComponent },
  {path: 'product-list', component: ProductListPageComponent, canActivate: [AdminGuard]},
  {path: 'printer-management', component: PrinterManagementComponent, canActivate: [AdminGuard]},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'checkout/:id', component: CheckoutComponent, canActivate: [AdminGuard, UserGuard]}
];

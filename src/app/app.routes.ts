import { Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {ProductCardComponent} from "./product-card/product-card.component";
import {ProductComponent} from "./product/product.component";
import {ProductListPageComponent} from "./product-list-page/product-list-page.component";
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';
import {PrinterManagementComponent} from "./printer-management/printer-management.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';


export const routes: Routes = [
  {path: '', component: HomepageComponent  },
  {path: 'products', component: ProductCatalogueComponent },
  {path: 'product-detail/:id', component: ProductComponent },
  {path: 'product-list', component: ProductListPageComponent, canActivate: [AuthGuard]},
  {path: 'printer-management', component: PrinterManagementComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'checkout/:id', component: CheckoutComponent}
];

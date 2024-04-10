import { Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {ProductCardComponent} from "./product-card/product-card.component";
import {ProductComponent} from "./product/product.component";

export const routes: Routes = [
  {path: '', component: HomepageComponent  },
  {path: 'products', component: ProductCardComponent },
  { path: 'product-detail/:id', component: ProductComponent },

];

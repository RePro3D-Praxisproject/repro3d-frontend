import { Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {ProductCardComponent} from "./product-card/product-card.component";

export const routes: Routes = [
  {path: '', component: HomepageComponent  },
  {path: 'products', component: ProductCardComponent }
];

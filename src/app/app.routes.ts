import { Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {ProductCardComponent} from "./product-card/product-card.component";
import {ProductComponent} from "./product/product.component";
import {ProductListPageComponent} from "./product-list-page/product-list-page.component";
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';

export const routes: Routes = [
  {path: '', component: HomepageComponent  },
  {path: 'products', component: ProductCatalogueComponent },
  {path: 'product-detail/:id', component: ProductComponent },
  {path: 'product-list', component: ProductListPageComponent }


];

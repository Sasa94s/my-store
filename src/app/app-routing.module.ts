import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductItemComponent} from "./components/product-item/product-item.component";
import {CartComponent} from "./components/cart/cart.component";
import {ConfirmationComponent} from "./components/confirmation/confirmation.component";

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'products', component: ProductListComponent, data: {title: 'Products List'}},
  {path: 'product/:id', component: ProductItemComponent, data: {title: 'Product'}},
  {path: 'cart', component: CartComponent, data: {title: 'Cart'}},
  {path: 'cart/submit', component: ConfirmationComponent, data: {title: 'Order Confirmation'}},
  {path: '**', redirectTo: 'products'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

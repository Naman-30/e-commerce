import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { SearchComponent } from './components/search/search.component';
import { AuthSellerGuard } from './modules/seller-home/guard/auth-seller.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
{
    path: 'cart',
    component: CartComponent,
  },
{
    path: 'checkout',
    component: CheckoutComponent,
  },
{
    path: 'my-orders',
    component: MyOrdersComponent,
  },

  {
    path: 'seller-auth',
    loadChildren: () =>
      import('./modules/seller-auth/seller-auth.module').then(
        (m) => m.SellerAuthModule
      ),
  },
  {
    path: 'seller-home',
    loadChildren: () =>
      import('./modules/seller-home/seller-home.module').then(
        (m) => m.SellerHomeModule
      ),
    canActivate: [AuthSellerGuard],
  },
  {
    path: 'search/:query',
    component: SearchComponent,
  },
  {
    path: 'details/:productId',
    component: ProductsDetailsComponent,
  },
  {
    path: 'user-auth',
    loadChildren: () =>
      import('./modules/user-auth/user-auth.module').then(
        (m) => m.UserAuthModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

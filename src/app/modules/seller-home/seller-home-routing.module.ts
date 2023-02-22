import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerHomeComponent } from './seller-home.component';

const routes: Routes = [
  { path: '', component: SellerHomeComponent },
  {
    path: 'manage-product',
    loadChildren: () =>
      import('../admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerHomeRoutingModule { }

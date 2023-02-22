import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerHomeRoutingModule } from './seller-home-routing.module';
import { SellerHomeComponent } from './seller-home.component';
import { AdminModule } from '../admin/admin.module';


@NgModule({
  declarations: [
    SellerHomeComponent,
  ],
  imports: [
    CommonModule,
    SellerHomeRoutingModule,
    AdminModule
  ]
})
export class SellerHomeModule { }

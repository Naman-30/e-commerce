import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerAuthRoutingModule } from './seller-auth-routing.module';
import { SellerAuthComponent } from './seller-auth.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    SellerAuthComponent
  ],
  imports: [
    CommonModule,
    SellerAuthRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class SellerAuthModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAuthRoutingModule } from './user-auth-routing.module';
import { UserAuthComponent } from './user-auth.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UserAuthComponent
  ],
  imports: [
    CommonModule,
    UserAuthRoutingModule,
    SharedModule
  ]
})
export class UserAuthModule { }

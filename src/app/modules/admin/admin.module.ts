import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddListComponent } from './components/show-list/add-list.component';


@NgModule({
  declarations: [
    AdminComponent,
    AddProductComponent,
    AddListComponent,
    EditProductComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    AdminComponent,
    AddProductComponent,
    AddListComponent,
    EditProductComponent,
  ]
})
export class AdminModule { }

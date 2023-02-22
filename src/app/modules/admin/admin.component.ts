import { Component, OnInit } from '@angular/core';
import { AddProductComponent } from './components/add-product/add-product.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

addProduct(){
  const dialogRef = this.dialog.open(AddProductComponent);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
}

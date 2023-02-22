import { Component, OnInit } from '@angular/core';
import { ManageProjectService } from 'src/app/services/manage-project.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orderData:any;

  constructor(private productService:ManageProjectService) { }

  ngOnInit(): void {
    this.getOrderData();
  }

  getOrderData(){
    this.productService.getOrderData().subscribe((res:any) => {
      console.log(res);
      this.orderData = res
    })
  }

  cancelOrder(id:any){
    this.productService.cancelOrder(id).subscribe((res:any) => {
      console.log(res);
      if(res){
        this.getOrderData();
      }

    })
  }
}

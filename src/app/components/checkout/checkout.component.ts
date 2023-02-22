import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice:any;
  cartData:any;

  constructor(private productService: ManageProjectService,private router: Router) { }

  ngOnInit(): void {
    this.productService.currentCart().subscribe((res:any) => {
      this.cartData = res
      console.log(res);

      let price = 0;
      res.forEach((item:any) => {
        price += (+item.price * +item.quantity)
      });
      this.totalPrice = price + price/20 + 50 - (price/10);
    })
  }

  orderNow(form:any){
   if(form.valid){
    let user = JSON.parse(localStorage.getItem('user') as string)
    if(this.totalPrice){
      let orderData = {
        ...form.value,
        totalPrice : this.totalPrice,
        userId : user[0].id
      }
      this.cartData.forEach((data:any) => {
        setTimeout(() => {
          this.productService.clearCart(data.id);
        }, 1000);
      });
      this.productService.orderNow(orderData).subscribe((res:any) => {
        if(res){
          alert('Order placed Successfully')
          form.reset();
          this.router.navigate(['my-orders'])
        }
      })
    }
   }else{
    alert('fill details properly')
   }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartData:any;
  cartHasItem:any;

  priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  constructor(private productService: ManageProjectService,
    private router:Router) { }

  ngOnInit(): void {
this.loadData();
  }

  removeData(productId:any){
    this.productService.removeFromCart(productId).subscribe((res:any) => {
      if(res){
this.loadData();
      }
    })
  }

  loadData(){
    if(localStorage.getItem('user')){

      this.productService.currentCart().subscribe((res:any) => {
        this.cartHasItem = res.length? true : false
        this.cartData = res;
        this.productService.cartItems.emit(res)
        let price = 0;
        res.forEach((item:any) => {
          price += (+item.price * +item.quantity)
        });
        console.log(res);

        this.priceSummary = {
          price: price,
          discount: price/10,
          tax: price/10,
          delivery: res.length? 50 : 0,
          total: res.length? (price + price/20 + this.priceSummary.discount - (price/10)):0
        }
      })
    }else{
      console.log(JSON.parse(localStorage.getItem('localCart') as string));

      let data = JSON.parse(localStorage.getItem('localCart') as string)
      this.cartData = data;

    }

  }

  checkout(){
    if(this.priceSummary.price){
      this.router.navigate(['/checkout'])
    }
  }
}

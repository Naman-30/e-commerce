import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
})
export class ProductsDetailsComponent implements OnInit {
  productId: any;
  product: any;
  productQuantity: number = 1;
  localCartData: any = [];
  isAddToCart = false;
  hasLocalCartData:any;
  currentProduct:any;

  constructor(
    private activeRoute: ActivatedRoute,
    private manageService: ManageProjectService
  ) {}

  ngOnInit(): void {
    this.productId = this.activeRoute.snapshot.paramMap.get('productId');
    this.manageService.detailsProduct(this.productId).subscribe((res: any) => {
      this.product = res;
      this.checkAddToCart(this.product);
    });
    let user = JSON.parse(localStorage.getItem('user') as string);
    if(user){
      this.manageService.getCartList(user[0].id);
      this.manageService.cartItems.subscribe((res:any) => {
        // console.log(res);

        let item = res.filter((item:any) => {
          return this.productId == item.productId
        })
        console.log(item);

        if(item.length){
          this.currentProduct = item;
          this.isAddToCart = true;
        }
      })

    }
  }

  checkAddToCart(data: any) {
    this.localCartData = localStorage.getItem('localCart');
    if (this.localCartData) {
      this.hasLocalCartData = JSON.parse(this.localCartData).filter((res: any) => {
        if(data.id == res.id){
          this.isAddToCart = true;
        }
        return data.id == res.id;

      });
    }
  }

  handleQuantity(value: string) {
    if (this.productQuantity < 20 && value === 'add') {
      this.productQuantity++;
    } else if (this.productQuantity > 1 && value == 'min') {
      this.productQuantity--;
    }
  }

  addToCart() {
    this.checkAddToCart(this.product)
    if (this.product) {
      this.product.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.manageService.localAddToCart(this.product);
        this.isAddToCart = true;
      }else{
        let userData = JSON.parse(localStorage.getItem('user') as string)
        let cardData = {
          ...this.product,
          userId: userData[0].id,
          productId: +this.productId
        }
        delete cardData.id;
        this.manageService.addToCart(cardData).subscribe((res:any) => {
          if(res){
            this.manageService.getCartList(userData[0].id);
            this.isAddToCart = true;
          }
        })
      }
    }
  }

  removeFromCart(){
    let user = JSON.parse(localStorage.getItem('user') as string);
    if(user){
      console.log(this.currentProduct);

      this.manageService.removeFromCart(this.currentProduct[0].id).subscribe((res:any) => {
        if(res){
          this.manageService.getCartList(user[0].id);
          this.isAddToCart = false;
        }
      })
    }else{
      this.checkAddToCart(this.product)
      this.localCartData = JSON.parse(this.localCartData)
      if(this.hasLocalCartData){
        let data = this.localCartData.filter((res: any) => {
          return this.hasLocalCartData[0].id !== res.id;
        })
        localStorage.setItem('localCart', JSON.stringify(data))
        this.manageService.cartItems.emit(data);
        this.isAddToCart = false;
      }
    }
  }
}

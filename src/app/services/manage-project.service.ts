import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageProjectService {

  cartItems = new EventEmitter<any>();
  constructor(private http:HttpClient) { }

  popularProduct(){
    return this.http.get('http://localhost:3000/products?_limit=3');
  }

  trendingProduct(){
    return this.http.get('http://localhost:3000/products?_limit=6');
  }

  searchProduct(query:any){
    return this.http.get(`http://localhost:3000/products?q=${query}`);
  }

  detailsProduct(id:any){
    return this.http.get(`http://localhost:3000/products/${id}`);
  }

  localAddToCart(data:any){
    let localData = localStorage.getItem('localCart');
    let localCartData = [];
    if(!localData){
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.cartItems.emit([data]);
    }else{
      localCartData = JSON.parse(localData);
      localCartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(localCartData))
    }
    this.cartItems.emit(localCartData);
  }

  addToCart(data:any){
    return this.http.post(`http://localhost:3000/cart`,data);
  }

  getCartList(userId:any){
    return this.http.get(`http://localhost:3000/cart?userId=${userId}`,
    {observe: 'response'}).subscribe((res:any) => {
      if(res && res.body){
        this.cartItems.emit(res.body);
      }
    })
  }

  removeFromCart(id:any){
    return this.http.delete(`http://localhost:3000/cart/${id}`);
  }

  currentCart(){
    let user = JSON.parse(localStorage.getItem('user') as string);
    return this.http.get(`http://localhost:3000/cart?userId=${user[0]?.id}`);
  }

  orderNow(data:any){
    return this.http.post(`http://localhost:3000/orders`,data);
  }

  getOrderData(){
    let user = JSON.parse(localStorage.getItem('user') as string);
    return this.http.get('http://localhost:3000/orders?userId='+user[0].id)
  }

  clearCart(id:any){
    this.http.delete('http://localhost:3000/cart/'+id,{observe: 'response'})
    .subscribe((res:any) => {
      if(res){
        this.cartItems.emit([])
      }
    })
  }

  cancelOrder(id:any){
    return this.http.delete(`http://localhost:3000/orders/${id}`);
  }
}

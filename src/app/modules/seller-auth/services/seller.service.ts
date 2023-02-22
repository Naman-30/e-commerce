import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLogin = new BehaviorSubject(false);
  sellerLoginError = new EventEmitter(false);

  constructor(private http: HttpClient, private router: Router) { }

  sellerSignUp(data:any){
    return this.http.post('http://localhost:3000/sellers', data,{observe: 'response'})
    .subscribe((res:any) => {
      console.log(res);
      this.isSellerLogin.next(true);
      localStorage.setItem('seller', JSON.stringify(res.body));
      this.router.navigate(['seller-home']);
    })
  }

  isReloaded(){
    if(localStorage.getItem('seller')){
      this.isSellerLogin.next(true);
      this.router.navigate(["seller-home"]);
    }
  }

  sellerLogin(data:any){
    this.http.get(`http://localhost:3000/sellers?email=${data.email}&password=${data.password}`,{
      observe: 'response'
    }).subscribe((res:any) => {
      console.log(res)
      if(res && res.body && res.body?.length){
        this.isSellerLogin.next(true);
      localStorage.setItem('seller', JSON.stringify(res.body));
      this.router.navigate(['seller-home']);
      }else{
        this.sellerLoginError.emit(true);
        console.log('error')

      }
    })
  }
}

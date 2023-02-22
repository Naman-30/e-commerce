import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from './services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private sellerService: SellerService, private router:Router) { }
  submitted = false;
  logSubmitted = false;
  isLogin:boolean = true;
  errorShow:any;

  ngOnInit(): void {
    this.sellerService.isReloaded();
  }

  sellerForm = {
    name: '',
    email: '',
    password: ''
  }

  login = {
    email: '',
    password: ''
  }

  sellerSubmit(form:any){
    if(form.valid){
      this.sellerService.sellerSignUp(this.sellerForm);
    }else{
      alert('enter a valid details')
    }
  }

  sellerLogin(form:any){
    this.logSubmitted = true;
    if(form.valid){
      this.sellerService.sellerLogin(this.login);
      this.sellerService.sellerLoginError.subscribe((res:any) => {
        this.errorShow = res;
        setTimeout(() => {
          this.errorShow = false;
        }, 5000);
      })
    }else{
     this.errorShow = true;
     setTimeout(() => {
      this.errorShow = false;
    }, 5000);
    }
  }
}

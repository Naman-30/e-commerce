import { Component, OnInit } from '@angular/core';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserDataService } from './services/user-data.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent{

  submitted = false;
  logSubmitted = false;
  isLogin:boolean = true;
  errorShow:any;
  currentUser:any;

  constructor(private userService: UserDataService,
    private productService: ManageProjectService) {
    this.userService.userOnReload();
  }

  userForm = {
    name: '',
    email: '',
    password: ''
  }

  login = {
    email: '',
    password: ''
  }

  userSubmit(form:any){
    if(form.valid){
      this.userService.signUpUser(this.userForm);
    }else{
      alert('enter a valid details')
    }
  }

  userLogin(form:any){
    this.logSubmitted = true;
    if(form.valid){
      console.log(form.value);
      this.userService.loginUser(this.login);
      this.localCartToDataBase();
    }else{
     this.errorShow = true;
     setTimeout(() => {
      this.errorShow = false;
    }, 5000);
    }
  }

  localCartToDataBase(){
    let localCartData = JSON.parse(localStorage.getItem('localCart') as string);

   if(localCartData){
    console.log(this.currentUser);

    localCartData.forEach((product:any, index:any) => {

      setTimeout(() => {
        this. currentUser = JSON.parse(localStorage.getItem('user') as string);
        console.log(this.currentUser);

        let cart = {
          ...product,
          productId : product?.id,
          userId: this.currentUser[0].id
        }
        delete product?.id;
        this.productService.addToCart(cart).subscribe((res:any) => {
          if(res){
            console.log(res);
          }
        })
      }, 2000);
      if(localCartData.length === index+1){
        localStorage.removeItem('localCart');
      }
    });
   }
   setTimeout(() => {
    this. currentUser = JSON.parse(localStorage.getItem('user') as string);
    this.productService.getCartList(this.currentUser[0].id);
   }, 3000);
  }
}

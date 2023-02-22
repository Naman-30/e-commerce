import { query } from '@angular/animations';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType:any;
  sellerName:any;
  userName:any;
  searchSuggestionArr:any;
  cartItems:any;

  constructor(private router:Router, private manageService:ManageProjectService) { }

  ngOnInit(): void {
    this.router.events.subscribe((res:any) => {
      if(res.url){
        if(localStorage.getItem('seller') && res.url.includes('seller')){
          this.menuType="seller";
          let sellerData = JSON.parse(localStorage.getItem('seller') as string);
          this.sellerName = sellerData[0].name
        }else if(localStorage.getItem('user')){
          let userData = JSON.parse(localStorage.getItem('user') as string);
          this.userName = userData.name;
          this.menuType = 'user'
          this.manageService.getCartList(userData[0].id)
        }else{
          this.menuType = 'default';
        }
      }
    })
    let localData = localStorage.getItem('localCart')
    if(localData ){
      this.cartItems = JSON.parse(localData).length;
    }
    this.manageService.cartItems.subscribe((res:any) => {
      if(res){
        this.cartItems = res.length;
      }
    })
  }

  onSearch(event:any){
    if(event){
      const element = event.target as HTMLInputElement;
      this.manageService.searchProduct(element.value).subscribe((res:any) => {
        if(res.length > 5){
          res.length = 5
        }
        this.searchSuggestionArr = res
      })
    }
  }

  hideSearch(input:any){
    this.searchSuggestionArr = undefined;
  }

  searchSubmit(search:any){
    this.router.navigate([`search/${search}`])
  }

  @ViewChildren('inputSearch') input:any;

  clickList(value:any){
    this.router.navigate([`search/${value}`])
  }

  logoutUser(){
    localStorage.removeItem('user')
    this.router.navigate(['/'])
    this.manageService.cartItems.emit([])
  }

  logoutSeller(){
    localStorage.removeItem('seller')
    this.router.navigate(['/'])
  }


}

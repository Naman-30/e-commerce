import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient, private router:Router) { }

  signUpUser(data:any){
    this.http.post('http://localhost:3000/users',data,{observe: 'response'})
    .subscribe((result:any) => {
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['/']);
      }
    })
  }

  userOnReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }

  loginUser(data:any){
    // http://localhost:3000/users?email=ajay@test.com
    this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{
      observe: 'response'
    }).subscribe((res:any) => {
      console.log(res);
      localStorage.setItem('user',JSON.stringify(res.body));
      this.router.navigate(['/']);
    })
  }
}

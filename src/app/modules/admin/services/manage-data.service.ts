import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageDataService {

  constructor(private http: HttpClient) { }

setData(data:any){
  return this.http.post('http://localhost:3000/products',data);
}

getData(){
  return this.http.get('http://localhost:3000/products');
}

getSingleData(id:any){
  return this.http.get('http://localhost:3000/products/'+id);
}

deleteData(id:any){
  return this.http.delete('http://localhost:3000/products/'+id);
}

editData(id:any,data:any){
  return this.http.put('http://localhost:3000/products/'+id,data);
}

dataUpdated = new BehaviorSubject<any>(null);
}

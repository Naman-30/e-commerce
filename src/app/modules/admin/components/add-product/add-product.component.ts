import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ManageDataService } from '../../services/manage-data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private fb: FormBuilder, private _dataService: ManageDataService) { }

  addForm = this.fb.group({
    name: ['',Validators.required],
    price: ['',Validators.required],
    url: ['',Validators.required],
    color: ['',Validators.required],
    category: ['',Validators.required],
    description: ['',Validators.required]
  })
  ngOnInit(): void {

  }


  addProduct(){
    if(this.addForm.valid){
      this._dataService.setData(this.addForm.value).subscribe((res:any) => {
        console.log(res);
        this._dataService.dataUpdated.next(true);
      },
      (err:any) => {
        console.log(err);
      })
  }else{
    alert('Enter a valid details')
  }
}


}

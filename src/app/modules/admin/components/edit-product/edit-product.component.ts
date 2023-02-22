import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManageDataService } from '../../services/manage-data.service';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
product:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private _dataService:ManageDataService, private router: Router) {
    this.product = this.data
    console.log('product',this.product)
    this.addForm.setValue({
    name: this.product.name,
    price: this.product.price,
    url: this.product.url,
    color: this.product.color,
    category: this.product.category,
    description: this.product.description
    })
  }

  addForm = this.fb.group({
    name: ['',Validators.required],
    price: ['',Validators.required],
    url: ['',Validators.required],
    color: ['',Validators.required],
    category: ['',Validators.required],
    description: ['',Validators.required]
  })

  ngOnInit(): void {

    console.log(this.product)

  }

  addProduct(){
    if(this.addForm.valid){
      this._dataService.editData(this.product.id, this.addForm.value).subscribe(res => {
        console.log(res);
        this._dataService.dataUpdated.next(true);
        this.router.navigate(['seller-home'])

      },
      err => {
        console.log(err)
      })
      }
  else{
    alert('Enter a valid details')
  }
}

}

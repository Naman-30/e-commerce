import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ManageDataService } from '../../services/manage-data.service';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit, AfterViewInit {

  constructor(private _dataService: ManageDataService, public dialog: MatDialog) { }
dataArray:any = [];
dataSource:any;
  ngOnInit(): void {
    this._dataService.dataUpdated.subscribe((res:any) => {
      this.getData();
    })
    this.getData();
  }

  displayedColumns: string[] = ['id','name', 'price', 'color', 'category', 'description'];


  @ViewChild(MatPaginator) paginator: MatPaginator|any;

  ngAfterViewInit() {
  setTimeout(() => {
    this.dataSource.paginator = this?.paginator;
  }, 1000);
  }

  getData(){
    this._dataService.getData().subscribe((res:any) => {
      this.dataArray = res
        // console.log(res)
        this.dataSource = new MatTableDataSource<any>(this.dataArray);
    })
  }
  removeProduct(id:any,i:any){
    this._dataService.deleteData(id).subscribe()
    this.getData();
    this.dataArray.splice(i,1);
  }

  editProduct(id:any,i:any){
    // this._dataService.getSingleData(id).subscribe((res:any) => {
    //   console.log(res)
    //   let value = {
    //     name: res.name[0],
    //     price: res.price[0],
    //     color: res.color[0],
    //     category: res.category[0],
    //     description: res.description
    //   }
    //     this.dialog.open(EditProductComponent, {
    //       data: value,
    //     })
    //   })
      this.getData();
      let res = this.dataArray[i]
      this.dialog.open(EditProductComponent, {
        data: res,
      })


  }
}

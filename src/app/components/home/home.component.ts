import { Component, OnInit } from '@angular/core';
import { ManageProjectService } from 'src/app/services/manage-project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productArr:any;
  trendingProductArr:any;


  constructor(private manageService: ManageProjectService) { }

  ngOnInit(): void {
    this.manageService.popularProduct().subscribe((res:any) => {
      this.productArr = res;
    },
    (err:any) => {
      console.log(err)
    })

  this.manageService.trendingProduct().subscribe((res:any) => {
    this.trendingProductArr = res;
  },
  (err:any) => {
    console.log(err)
  })
}


}

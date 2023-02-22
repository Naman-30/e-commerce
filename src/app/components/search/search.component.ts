import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchArray:any;
  query:any;

  constructor(private activeRoute:ActivatedRoute,
    private manageService: ManageProjectService,
    private router:Router) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((res:any) => {
    this.query = res.get('query');
    });
    this.manageService.searchProduct(this.query).subscribe((res:any) => {
      this.searchArray = res;
    })
    this.router.events.subscribe((res:any) => {

        this.activeRoute.paramMap.subscribe((res:any) => {
          this.query = res.get('query');
          });
          this.manageService.searchProduct(this.query).subscribe((res:any) => {
            this.searchArray = res;
          })
    })
  }

}

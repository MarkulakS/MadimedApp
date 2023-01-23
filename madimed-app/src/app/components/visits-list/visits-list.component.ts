import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';
import { Visit } from 'src/app/models/visit';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-visits-list',
  templateUrl: './visits-list.component.html',
  styleUrls: ['./visits-list.component.scss']
})
export class VisitsListComponent implements OnInit {
  visits?: Visit[];
  pagination?: Pagination;
  container = 'NotDone';
  pageNumber = 1;
  pageSize = 5;
  
  constructor(private visitService: VisitService) { }

  ngOnInit(): void {
    this.loadVisits();
  }

  loadVisits(): void {
    this.visitService.getVisits(this.pageNumber, this.pageSize, this.container).subscribe({
      next: response => {
        this.visits = response.result;
        this.pagination = response.pagination;
      }
    })
  }

  pageChange(event: any) {
    if(this.pageNumber !== event.page)
    {
      this.pageNumber = event.page;
      this.loadVisits();
    }
  }
}

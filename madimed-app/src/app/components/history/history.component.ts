import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';
import { Visit } from 'src/app/models/visit';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  visits?: Visit[];
  pagination?: Pagination;
  container = 'Outbox';
  pageNumber = 1;
  pageSize = 5;
  madeVisit = '';
  zmienna: number;
  
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

import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';
import { User } from 'src/app/models/user';
import { Visit } from 'src/app/models/visit';
import { MembersService } from 'src/app/services/members.service';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-visits-list',
  templateUrl: './visits-list.component.html',
  styleUrls: ['./visits-list.component.scss']
})
export class VisitsListComponent implements OnInit {
  user?: User;
  visits?: Visit[];
  pagination?: Pagination;
  container: string;
  pageNumber = 1;
  pageSize = 5;
  
  constructor(private visitService: VisitService, private memberService: MembersService) { 
    this.user = this.memberService.getUser();
    if(this.user.roles[0] === 'Personel') {
      this.container = 'Inbox';
    }else{
      this.container = 'NotDone';
    }
  }

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

  deleteVisit(id: number) {
    this.visitService.deleteVisit(id).subscribe(() => {
      this.loadVisits();
    })
  }

  makeVisitMade(id: number) {
    this.visitService.makeVisitMade(id).subscribe(() => {
      this.loadVisits();
    },error => {
      console.log(error);
    })
  }
}

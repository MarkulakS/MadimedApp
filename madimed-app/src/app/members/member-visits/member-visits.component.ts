import { Component, Input, OnInit, Output } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';
import { Visit } from 'src/app/models/visit';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-member-visits',
  templateUrl: './member-visits.component.html',
  styleUrls: ['./member-visits.component.scss']
})
export class MemberVisitsComponent implements OnInit {
  @Input() pesel?: string;
  @Input() visits: Visit[] = [];
  @Output() pagination?: Pagination;
  container = 'NotDone';

  constructor(private visitService: VisitService) { }

  ngOnInit(): void {
    console.log(this.pagination);
  }



}

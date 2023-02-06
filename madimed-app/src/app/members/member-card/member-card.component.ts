import { getLocaleDateFormat } from '@angular/common';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/models/members';
import { Pagination } from 'src/app/models/pagination';
import { Visit } from 'src/app/models/visit';
import { MembersService } from 'src/app/services/members.service';
import { VisitService } from 'src/app/services/visit.service';
import { MemberVisitsComponent } from '../member-visits/member-visits.component';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
  
@ViewChild('memberTabs') memberTabs: TabsetComponent;
activeTab: TabDirective;
@Input() member: Member = {} as Member;
// @Output() memberList: Member = {} as Member;
visits: Visit[] = [];
@ViewChild('memberVisit') memberVisit: MemberVisitsComponent;
pagination?: Pagination;
@Output() container: 'NotDone';
pageNumber = 1;
pageSize = 7;

  constructor(private memberService: MembersService, private route: ActivatedRoute, private visitService: VisitService) { }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.member = data['member']
    })
    // this.memberList = this.member;
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get('pesel')).subscribe(member => {
      this.member = member;
    })
  }

  loadVisits(): void {
    if(this.member){
      this.visitService.getVisitThread(this.member.pesel).subscribe({
        next: visit => {this.visits = visit
        console.log("Visit: "+visit[0].dateRead);}

      })
    }
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if(this.activeTab.heading === 'Scheduled visits') {
      this.loadVisits();
    }else if(this.activeTab.heading === 'History') {
      this.loadVisits();
    }
  }

  pageChange(event: any) {
    if(this.pageNumber !== event.page)
    {
      this.pageNumber = event.page;
      this.loadVisits();
    }
  }

}

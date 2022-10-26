import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/models/members';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
@Input() member: Member;

  constructor() { }

  ngOnInit(): void {
  }

}

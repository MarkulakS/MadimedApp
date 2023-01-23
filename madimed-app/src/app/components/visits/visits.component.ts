import { Time } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateFormatter } from 'ngx-bootstrap/datepicker';
import { Member } from 'src/app/models/members';
import { Pagination } from 'src/app/models/pagination';
import { Visit } from 'src/app/models/visit';
import { MembersService } from 'src/app/services/members.service';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {
  @ViewChild('visitForm') visitForm: NgForm;
  member: Member = {} as Member;
  visits: Visit[] = [];  
  dateVisit: Date;
  comments: string;
  timeVisit: any;
  firstName: string;
  lastName: string;

  constructor(private memberService: MembersService, private visitService: VisitService) { }

  ngOnInit(): void {
    this.makeDay();
  }

  makeDay() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("dateVisit")[0].setAttribute('min', today);
  }

  onSubmit() {
    var e = (document.getElementById("doctors")) as HTMLSelectElement;
    var doctor = e.options[e.selectedIndex].text;
    var splits = doctor.split(' ');
    this.firstName = splits[1];
    this.lastName = splits[2];

    var m = (document.getElementById("visits")) as HTMLSelectElement;
    var form = m.options[m.selectedIndex].text;

    //register on visit
    console.log(
      "Doctor: ", doctor,
      "\nDate of visit: ", this.dateVisit,
      "\nTime visit: ", this.getTime().toLocaleTimeString(),
      "\nForm of visit: ", form,
      "\nComments: ", this.comments
      );


    // this.memberService.getDoctor(this.firstName, this.lastName).subscribe(member => {
    //   this.member = member;
    //   console.log("try pesel: " + this.member.pesel);
    // })
    this.memberService.getDoctor(this.firstName, this.lastName);


    // if (!this.member.pesel) return;

    // this.visitService.addVisit(this.member.pesel, this.dateVisit, this.getTime(), form, this.comments).subscribe({
    //   next: visit => 
    //   {
    //     this.visits.push(visit);
    //     this.visitForm.reset();
    //   },error: error => {
    //     console.log(error);
    //   }
    // })
  }

  getTime() {
    let hours = this.timeVisit.getHours();
    let minutes = this.timeVisit.getMinutes();

    var time = new Date();
    time.setHours(hours,minutes);

    // return time.toLocaleTimeString();
    return time;
  }

}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Member } from 'src/app/models/members';
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
  personel: Member[] = [];
  visits: Visit[] = [];
  selectedPersonelId: number;
  selectedPersonel: Member;
  dateVisit: Date = new Date();
  comments: string;
  timeVisit: any;
  disableTime: Date[] = [];

  constructor(private memberService: MembersService, private visitService: VisitService) { }

  ngOnInit(): void {
    this.disableDaysBefore();
    this.getPersonel();    
    this.selectedPersonel = this.personel.find(p => p.id === this.selectedPersonelId);
  }

  //TUTAJ
  checkAvailableTimeVisit(timeSpan: Date) {
    this.visitService.getTimeVisitsFromDay(timeSpan).subscribe({
      next: time => {
        if(time != null) {
          for(let i=0; i<time.length;i++){
            this.disableTime[i] = new Date(time[i]);
            console.log(this.disableTime[i].toLocaleTimeString());

            if(this.disableTime[i].toLocaleTimeString() === this.timeVisit.toLocaleTimeString()) {
              //Tutaj możesz dodać jakieś komunikaty lub inne akcje żeby zablokować wybraną godzinę
              
            }
          }
        }
      }
    })
  }
  //TUTAJ

  getPersonel() {
    this.memberService.getPersonel().subscribe({
      next: personel => {
        this.personel = personel;
      }
    })
  }

  updateSelectedPersonel() {
    this.selectedPersonel = this.personel.find(p => p.id === this.selectedPersonelId);
  }
  
  disableDaysBefore() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("dateVisit")[0].setAttribute('min', today);
  }

  getTime(dateVisit: Date) {
    let hours = this.timeVisit.getHours();
    let minutes = this.timeVisit.getMinutes();

    var time = new Date(dateVisit);
    time.setUTCHours(hours, minutes, 0);

    return time;
  }

  onSubmit() {
    var e = (document.getElementById("doctors")) as HTMLSelectElement;
    var doctorPesel = e.options[e.selectedIndex].value;

    var m = (document.getElementById("visits")) as HTMLSelectElement;
    var form = m.options[m.selectedIndex].text;

    //register on visit
    // this.visitService.addVisit(doctorPesel, this.dateVisit, this.getTime(this.dateVisit), form, this.comments).subscribe({
    //   next: visit => 
    //   {
    //     this.visits.push(visit);
    //     this.visitForm.reset();
    //   },error: error => {
    //     console.log(error);
    //   }
    // })
  }
}

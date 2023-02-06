import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';
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
  doctorPesel: string;
  dateVisit: Date = new Date();
  comments: string;
  timeVisit: Date = new Date();
  disableTime: Date[] = [];
  mstep = 20;
  minTime: Date = new Date();
  maxTime: Date = new Date();
  startTime: Date = new Date();
  valid = true;
  dataAvailable = true;
  doctorValid = false;
  timeValid = false;

  constructor(private memberService: MembersService, private visitService: VisitService) {
  }

  ngOnInit(): void {
    this.minTime.setHours(8);
    this.minTime.setMinutes(55);
    this.maxTime.setHours(18);
    this.maxTime.setMinutes(40);
    this.startTime.setHours(9);
    this.startTime.setMinutes(0);
    this.timeVisit.setHours(9);
    this.timeVisit.setMinutes(0);
    this.timeVisit.setSeconds(0);

    this.disableDaysBefore();
    this.getPersonel();    
    this.selectedPersonel = this.personel.find(p => p.id === this.selectedPersonelId);
  }

  isValid(event: boolean): void {
    this.valid = event; 
  }

  checkTime(time: Date) {
    let selectedTime = new Date(this.dateVisit);
    selectedTime.setHours(time.getHours());
    selectedTime.setMinutes(time.getMinutes());
    selectedTime.setSeconds(0, 0);
  
    for (let disabledTime of this.disableTime) {
      let disabledTimeAdjusted = new Date(disabledTime.getTime());
      disabledTimeAdjusted.setSeconds(0, 0);
  
      if (selectedTime.getTime() === disabledTimeAdjusted.getTime()) {
        this.dataAvailable = false;
        return false;
      }
    }
    this.dataAvailable = true;
    return true;
  }

  checkAvailableTimeVisit(timeSpan: Date) {
    this.visitService.getTimeVisitsFromDate(this.doctorPesel, timeSpan).subscribe({
      next: time => {
        if(time != null) {
          for(let i=0; i < time.length; i++){
            this.disableTime[i] = new Date(time[i]);
          }
        }
        this.checkTime(this.startTime);
      }
    })
    this.timeValid = true;
  }

  getPersonel() {
    this.memberService.getPersonel().subscribe({
      next: personel => {
        this.personel = personel;
      }
    })
  }

  updateSelectedPersonel() {
    this.selectedPersonel = this.personel.find(p => p.id === this.selectedPersonelId);
    var e = (document.getElementById("doctors")) as HTMLSelectElement;
    this.doctorPesel = e.options[e.selectedIndex].value;
    this.doctorValid = true;
    if(!this.dataAvailable) this.checkAvailableTimeVisit(this.dateVisit);
  }
  
  disableDaysBefore() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("dateVisit")[0].setAttribute('min', today);
  }

  getTimeVisit(dateVisit: Date) {
    let hours = this.timeVisit.getHours();
    let minutes = this.timeVisit.getMinutes();

    var time = new Date(dateVisit);
    time.setUTCHours(hours, minutes, 0);

    return time;
  }

  onSubmit() {
    var m = (document.getElementById("visits")) as HTMLSelectElement;
    var form = m.options[m.selectedIndex].text;

    //register on visit
    this.visitService.addVisit(this.doctorPesel, this.dateVisit, this.getTimeVisit(this.dateVisit), form, this.comments).subscribe({
      next: visit => 
      {
        this.visits.push(visit);
        location.reload();
      },error: error => {
        console.log(error);
      }
    })
  }
}

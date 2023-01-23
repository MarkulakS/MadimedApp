import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterEvent } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/models/members';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;

  @HostListener('window: beforeunload', ['$event']) unloadNotification($event: any) {
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }
  member: Member = {} as Member;
  user: User;
  date: string;
  

  constructor(private accountsService: AccountService, private memberService: MembersService,
     private route: Router, private toastr: ToastrService) {
      this.accountsService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.loadMember();
    this.date = this.member.dateOfBirth.toLocaleDateString();
    console.log("date: "+this.date);
  }

  loadMember() {
    this.memberService.getMember(this.user.pesel).subscribe(member => {
      this.member = member;
    })

  }

  cancel() {
    this.route.navigateByUrl('/');
  }

  updateMember() {
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success("Profile updated successfuly");
      this.editForm.reset(this.member);
    })
  }

  deleteMember() {
    this.memberService.deleteMember(this.member).subscribe(() => {
      this.toastr.success("Profile deleted successfuly");
      this.route.navigateByUrl('/');
    })
  }

}

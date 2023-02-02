import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from '../models/members';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  member: Member = {} as Member;
  user: User;
  model: any = {};
  ngZone: any;

  constructor(public accountService: AccountService, 
              private router: Router, 
              private memberService: MembersService) { 
                this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
              }

  ngOnInit(): void {
    if(this.user) {
      this.loadMember();
    }
  }

  loadMember() {
    this.memberService.getMember(this.user.pesel).subscribe(member => {
      this.member = member;
    })
  }

  login() {
    this.accountService.login(this.model).subscribe(() => {
      this.router.navigateByUrl('/').then(() => {
        location.reload();
      })
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/').then(() => {
      location.reload();
    })
  }

  signUp() {
    this.router.navigateByUrl('/register');
  }
}

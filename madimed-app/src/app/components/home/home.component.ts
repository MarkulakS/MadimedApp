import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    console.log("Zalogowny czy nie: " + this.accountService.currentUser$.subscribe(response => {
      console.log("cos tu jest: " + response);
    }));
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

}

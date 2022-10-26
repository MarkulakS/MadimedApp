import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  isActiveF = true;
  isActiveS = false;
  isCheckedClinic = false;

  constructor(private accountService: AccountService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe(response => {
      console.log(response);
      this.cancel();
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  goBack(): void {
    this.router.navigateByUrl('/test')
  }

  activeFirst(): void {
    this.isActiveF = true;
    this.isActiveS = false;
  }

  activeSecond(): void {
    this.isActiveF = false;
    this.isActiveS = true;
  }

  onCheckboxChange(event: any){
    if(event.checked){
      this.isCheckedClinic = true;
    }else{
      this.isCheckedClinic = false
    }
  }
}

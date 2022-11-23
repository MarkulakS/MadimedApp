import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  registerForm: FormGroup;
  validationsErrors: string[] = [];

  isActiveF = true;
  isActiveS = false;
  isCheckedClinic = false;

  constructor(private accountService: AccountService, private toastr: ToastrService, private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
      this.registerForm = this.fb.group({
        pesel: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
        confirmPassword: ['', [Validators.required, this.matchValues('password')]],
        phone: ['', [Validators.required, Validators.minLength(9)]],
        email: ['', [Validators.required, Validators.email]],
        dateOfBirth: ['', Validators.required],
        street: ['', Validators.required],
        town: ['', Validators.required],
        code: ['', Validators.required],
        lastClinic: []
      })
      this.registerForm.controls['password'].valueChanges.subscribe(() => {
        this.registerForm.controls['confirmPassword'].updateValueAndValidity();
      })
  }

  matchValues(matchTo: string): ValidatorFn {
    return(control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/')
      // this.cancel();
    }, error => {
      this.validationsErrors = error;
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

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  validationsErrors: string[] = [];
  adres: string[] = [];

  isActiveF = true;
  isActiveS = false;
  isActiveT = false;
  isCheckedClinic = false;

  constructor(private accountService: AccountService, private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
      this.registerForm = this.fb.group({
        pesel: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, this.matchValues('password')]],
        phone: ['', [Validators.required, Validators.minLength(9)]],
        email: ['', [Validators.required, Validators.email]],
        dateOfBirth: ['', Validators.required],
        address: this.fb.group({
          street: ['', Validators.required],
          town: ['', Validators.required],
          code: ['', Validators.required]
        }),
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
    const address = this.registerForm.get('address').value;
    const plainAddress = Object.assign({}, address);
    const addressArray = [plainAddress];
    this.accountService.register({...this.registerForm.value, address: addressArray}).subscribe(response => {
      this.router.navigateByUrl('/').then(() => {
        location.reload();
      })
    }, error => {
      this.validationsErrors = error;
      console.log(error);
    });
  }

  cancel() {
    this.router.navigateByUrl('/');
  }

  activeFirst(): void {
    this.isActiveF = true;
    this.isActiveS = false;
  }

  activeSecond(): void {
    this.isActiveF = false;
    this.isActiveT = false;
    this.isActiveS = true;
  }

  activeThird(): void {
    this.isActiveS = false;
    this.isActiveT = true;
  }


  onCheckboxChange(event: any){
    if(event.checked){
      this.isCheckedClinic = true;
    }else{
      this.isCheckedClinic = false
    }
  }
}

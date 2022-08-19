import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    ToastrModule.forRoot({
      positionClass: 'toastr-bottom-right'
    })
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    ToastrModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OtpModalComponent } from './otp-modal.component';



@NgModule({
  declarations: [OtpModalComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class OtpModule { }

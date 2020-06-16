import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';



@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    SharedModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }

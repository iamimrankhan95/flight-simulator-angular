import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { HttpClientModule } from '@angular/common/http';
import { UserRoutingModule } from './user-routing.module';
import { TextMaskModule } from 'angular2-text-mask';
import { DataTablesModule } from 'angular-datatables';
import { UpdateUserComponent } from './update-user/update-user.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { OtpModule } from '../../shared/modules/otp/otp.module';
import { NotificationModule } from '../../shared/modules/notification/notification.module';

@NgModule({
  declarations: [CreateUserComponent, ListUserComponent, UpdateUserComponent],
  imports: [
    UserRoutingModule,
    TextMaskModule,
    DataTablesModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    // OtpModule.forChild(),
    NotificationModule
  ]
})
export class UserModule { }

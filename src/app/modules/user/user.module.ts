import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserRoutingModule } from './user-routing.module';
import { TextMaskModule } from 'angular2-text-mask';
import { DataTablesModule } from 'angular-datatables';
import { UpdateUserComponent } from './update-user/update-user.component';
import {
  NgbModal,
  NgbActiveModal,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../../shared/modules/shared/shared.module';

@NgModule({
  declarations: [CreateUserComponent, ListUserComponent, UpdateUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    TextMaskModule,
    DataTablesModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [],
  entryComponents: [],
})
export class UserModule {}

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
import { NgbModal, NgbActiveModal, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ CreateUserComponent, ListUserComponent, UpdateUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    HttpClientModule,
    TextMaskModule,
    DataTablesModule,
    NgbModule
  ],
  providers: [
    NgbModal,
    NgbActiveModal
  ],
  entryComponents: [
    UpdateUserComponent
  ]
})
export class UserModule { }

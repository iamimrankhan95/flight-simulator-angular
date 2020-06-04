import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CRMRoutingModule } from './crm-routing.module';
import { CRMFormComponent } from './crm-form/crm-form.component';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { AddressModule } from '../../shared/modules/address/address.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// Ng2-select
import { SelectModule } from 'ng-select';
@NgModule({
  declarations: [
    CRMFormComponent,
  ],
  imports: [
    CommonModule,
    CRMRoutingModule,
    SharedModule,
    AddressModule,
    FontAwesomeModule,
    BsDatepickerModule.forRoot(),
    SelectModule
  ]
})
export class CRMModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CRMRoutingModule } from './crm-routing.module';
import { CRMFormComponent } from './crm-form/crm-form.component';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { AddressModule } from '../../shared/modules/address/address.module';
// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// Ng2-select
import { SelectModule } from 'ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    SelectModule,
    
  ]
})
export class CRMModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CRMRoutingModule } from './crm-routing.module';
import { CRMFormComponent } from './crm-form/crm-form.component';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { AddressModule } from '../../shared/modules/address/address.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CRMHttpService } from './crm-http.service';
import { CRMService } from './crm.service';
@NgModule({
  declarations: [
    CRMFormComponent,
  ],
  imports: [
    CRMRoutingModule,
    SharedModule,
    AddressModule,
    FontAwesomeModule,
  ],
  providers: [CRMHttpService, CRMService]
})
export class CRMModule { }

import { NgModule } from '@angular/core';

import { CRMRoutingModule } from './crm-routing.module';
import { CRMFormComponent } from './crm-form/crm-form.component';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { AddressModule } from '../../shared/modules/address/address.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CRMHttpService } from './crm-http.service';
import { CRMService } from './crm.service';
import { CrmDetailsComponent } from './crm-details/crm-details.component';
import { CrmListComponent } from './crm-list/crm-list.component';
import { DataTableModule } from 'angular2-datatable';
@NgModule({
  declarations: [
    CRMFormComponent,
    CrmDetailsComponent,
    CrmListComponent,
  ],
  imports: [
    CRMRoutingModule,
    SharedModule,
    AddressModule,
    FontAwesomeModule,
    DataTableModule
  ],
  providers: [CRMHttpService, CRMService]
})
export class CRMModule { }

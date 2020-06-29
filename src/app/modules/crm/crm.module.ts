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
import { DataTablesModule } from 'angular-datatables';
import { NotificationModule } from '../../shared/modules/notification/notification.module';
import { CrmEditComponent } from './crm-edit/crm-edit.component';
@NgModule({
  declarations: [
    CRMFormComponent,
    CrmDetailsComponent,
    CrmListComponent,
    CrmEditComponent,
  ],
  imports: [
    CRMRoutingModule,
    SharedModule,
    AddressModule,
    FontAwesomeModule,
    DataTablesModule,
    NotificationModule
  ],
  providers: [CRMHttpService, CRMService]
})
export class CRMModule { }

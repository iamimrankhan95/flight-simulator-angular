import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CRMRoutingModule } from './crm-routing.module';
import { CRMFormComponent } from './crm-form/crm-form.component';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { AddressModule } from '../../shared/modules/address/address.module';


@NgModule({
  declarations: [
    CRMFormComponent
  ],
  imports: [
    CommonModule,
    CRMRoutingModule,
    SharedModule,
    AddressModule
  ]
})
export class CRMModule { }

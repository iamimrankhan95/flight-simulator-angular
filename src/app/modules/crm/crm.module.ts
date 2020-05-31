import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CRMRoutingModule } from './crm-routing.module';
import { CRMFormComponent } from './crm-form/crm-form.component';
import { SharedModule } from '../../shared/modules/shared/shared.module';


@NgModule({
  declarations: [
    CRMFormComponent
  ],
  imports: [
    CommonModule,
    CRMRoutingModule,
    SharedModule
  ]
})
export class CRMModule { }

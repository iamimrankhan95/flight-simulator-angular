import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CRMRoutingModule } from './crm-routing.module';
import { CRMFormComponent } from './crm-form/crm-form.component';


@NgModule({
  declarations: [
    CRMFormComponent
  ],
  imports: [
    CommonModule,
    CRMRoutingModule
  ]
})
export class CRMModule { }

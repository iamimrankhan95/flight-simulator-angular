import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscalationRoutingModule } from './escalation-routing.module';
import { CreateEscalationComponent } from './create-escalation/create-escalation.component';
import { EscalationDetailsComponent } from './escalation-details/escalation-details.component';
import { SharedModule } from '../../shared/modules/shared/shared.module';


@NgModule({
  declarations: [CreateEscalationComponent, EscalationDetailsComponent],
  imports: [
    SharedModule,
    EscalationRoutingModule
  ]
})
export class EscalationModule { }

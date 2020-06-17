import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscalationRoutingModule } from './escalation-routing.module';
import { CreateEscalationComponent } from './create-escalation/create-escalation.component';
import { EscalationDetailsComponent } from './escalation-details/escalation-details.component';


@NgModule({
  declarations: [CreateEscalationComponent, EscalationDetailsComponent],
  imports: [
    CommonModule,
    EscalationRoutingModule
  ]
})
export class EscalationModule { }

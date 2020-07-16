import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscalationRoutingModule } from './escalation-routing.module';
import { CreateEscalationComponent } from './create-escalation/create-escalation.component';
import { EscalationDetailsComponent } from './escalation-details/escalation-details.component';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { EscalationContainerComponent } from './escalation-container/escalation-container.component';
import { EscalationService } from './escalation.service';
import { EscalationHttpService } from './escalation-http.service';


@NgModule({
  declarations: [CreateEscalationComponent, EscalationDetailsComponent, EscalationContainerComponent],
  imports: [
    SharedModule,
    EscalationRoutingModule
  ],
  exports:[
    EscalationContainerComponent
  ],
  providers:[EscalationService, EscalationHttpService]
})
export class EscalationModule { }

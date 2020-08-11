import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightSimulatorRoutingModule } from './flight-simulator-routing.module';
import { FlightSimulatorComponent } from './flight-simulator.component';
import { SharedModule } from '../../shared/modules/shared/shared.module';


@NgModule({
  declarations: [FlightSimulatorComponent],
  imports: [
    CommonModule,
    SharedModule,
    FlightSimulatorRoutingModule
  ]
})
export class FlightSimulatorModule { }

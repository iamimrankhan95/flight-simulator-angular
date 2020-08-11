import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightSimulatorRoutingModule } from './flight-simulator-routing.module';
import { FlightSimulatorComponent } from './flight-simulator.component';


@NgModule({
  declarations: [FlightSimulatorComponent],
  imports: [
    CommonModule,
    FlightSimulatorRoutingModule
  ]
})
export class FlightSimulatorModule { }

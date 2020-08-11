import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightSimulatorRoutingModule } from './flight-simulator-routing.module';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightSimulatorComponent } from './flight-simulator-form/flight-simulator.component';


@NgModule({
  declarations: [FlightSimulatorComponent, FlightListComponent],
  imports: [
    CommonModule,
    SharedModule,
    FlightSimulatorRoutingModule
  ]
})
export class FlightSimulatorModule { }

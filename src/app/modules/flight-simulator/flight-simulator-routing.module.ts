import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlightSimulatorComponent } from './flight-simulator.component';

const routes: Routes = [{ path: '', component: FlightSimulatorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightSimulatorRoutingModule { }

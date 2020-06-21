import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEscalationComponent } from './create-escalation/create-escalation.component';
import { EscalationDetailsComponent } from './escalation-details/escalation-details.component';


const routes: Routes = [
  // { path: '', redirectTo: 'list' },
  // {
  //   path: 'list', component: CrmListComponent, data: {
  //     title: 'Customer Relation List'
  //   }
  // },
  {
    path: 'create', component: CreateEscalationComponent, data: {
      title: 'Create Customer Relation'
    } },
  { path: 'details/:id', component: EscalationDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EscalationRoutingModule { }

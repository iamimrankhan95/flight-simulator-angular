import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CRMFormComponent } from './crm-form/crm-form.component';
import { CrmListComponent } from './crm-list/crm-list.component';
import { CrmDetailsComponent } from './crm-details/crm-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: CrmListComponent },
  { path: 'create', component: CRMFormComponent, },
  { path: 'details/:id', component: CrmDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CRMRoutingModule { }

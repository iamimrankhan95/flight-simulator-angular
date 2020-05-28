import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CRMFormComponent } from './crm-form/crm-form.component';


const routes: Routes = [
  {
    path: '',
    component: CRMFormComponent,
  },
  {
    path: 'create',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CRMRoutingModule { }

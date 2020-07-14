import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CRMFormComponent } from './crm-form/crm-form.component';
import { CrmListComponent } from './crm-list/crm-list.component';
import { CrmDetailsComponent } from './crm-details/crm-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'list' },
  {
    path: 'list', component: CrmListComponent, data: {
      title: 'Customer Relation List'
    }
  },
  {
    path: 'create', component: CRMFormComponent, data: {
      title: 'Create Customer Relation'
    }
  },
  {
    path: 'create/:id', component: CRMFormComponent, data: {
      title: 'Update Customer Relation'
    }
  },
  {
    path: 'details/:id', component: CrmDetailsComponent
  },
  // {
  //   path: 'edit',  component: CrmEditComponent, data: {
  //     title: 'Edit Customer Relation'
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CRMRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { RouterModule, Routes } from '@angular/router';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  {
    path: '',
    component: CreateUserComponent,
    data: { title: 'Create User' },
  },
  {
    path: 'create',
    redirectTo: '',
  },
  {
    path: 'create/:id',
    component: CreateUserComponent,
  },
  { path: 'list', component: ListUserComponent, data: { title: 'User List' } },
  // {
  //   path: 'update/:id',
  //   component: UpdateUserComponent,
  //   data: { title: 'Update User' },
  // },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }

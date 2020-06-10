import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from '../../containers';
import { LoginComponent } from './login/login/login.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

const routes: Routes = [
  { path: '', component: LoginComponent, data: { title: 'User Login' } },
  { path: 'login', component: LoginComponent, data: { title: 'User Login' } },
  // use id here
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    data: { title: 'Change Password' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

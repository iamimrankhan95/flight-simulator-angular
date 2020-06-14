import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { LoginComponent } from './login/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/modules/shared/shared.module';
// In memory implementation -- remove later
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  declarations: [LoginComponent, ChangePasswordComponent],
  imports: [
    SharedModule,
    AuthRoutingModule,
  ],
  providers: [
  ],
  exports: [
  ]
})
export class AuthModule {}

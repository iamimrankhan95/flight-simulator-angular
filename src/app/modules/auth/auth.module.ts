import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { LoginComponent } from './login/login/login.component';
import { HttpClientModule } from '@angular/common/http';
// In memory implementation -- remove later
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  declarations: [LoginComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  exports: [],
})
export class AuthModule {}

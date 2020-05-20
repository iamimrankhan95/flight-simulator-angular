import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { LoginComponent } from './login/login/login.component';
import { HttpClientModule } from '@angular/common/http';

// In memory implementation -- remove later
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';




@NgModule({
  declarations: [LoginComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    HttpClientModule
    // HttpClientModule,
    // ToasterModule
  ],
  providers: [
    // ToasterService,
    // ToasterHelperService,
    // UserDataService,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  exports: [
    // ChangePasswordFormComponent
  ],
  // entryComponents: [DefaultLayoutComponent],
})
export class AuthModule { }

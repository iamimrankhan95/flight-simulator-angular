import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { P404Component } from '../modules/error/404.component';
import { P500Component } from '../modules/error/500.component';
import { RegisterComponent } from '../modules/register/register.component';
import { CRMHttpService } from '../modules/crm/crm-http.service';
import { HttpErrorHandler } from '../shared/services/http-error-handler.service';
import { httpInterceptorProviders } from '../shared/services/http-interceptors';
import { MessageService } from '../shared/services/message.service';
import { AuthenticationService } from '../modules/auth/authentication.service';



@NgModule({
  declarations: [
    P404Component,
    P500Component,
    RegisterComponent,
  ],
  imports: [
    SharedModule
  ],
  providers: [AuthenticationService, HttpErrorHandler, httpInterceptorProviders, MessageService]
})
export class CoreModule { }

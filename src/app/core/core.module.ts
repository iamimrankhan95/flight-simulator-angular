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
import { AddressHttpService } from '../shared/modules/address/address-http.service';
import { AppService } from '../app.service';
import { NgbDateCustomParserFormatter } from '../shared/modules/shared/pipes/date-fomatter';



@NgModule({
  declarations: [
    P404Component,
    P500Component,
    RegisterComponent,
  ],
  imports: [
    SharedModule
  ],
  providers: [
    AuthenticationService,
    AppService,
    HttpErrorHandler,
    httpInterceptorProviders,
    MessageService,
    AddressHttpService,
    NgbDateCustomParserFormatter
  ]
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { LoginComponent } from './login/login.component';
// In memory implementation -- remove later
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  declarations: [LoginComponent],
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

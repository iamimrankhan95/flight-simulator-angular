import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OtpModalComponent } from './otp-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OtpService } from './otp.service';

@NgModule({
  declarations: [OtpModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    ModalModule.forRoot(),
  ],
  exports: [OtpModalComponent],

})
export class OtpModule {
  static forChild(): ModuleWithProviders<OtpModule> {
    return {
      ngModule: OtpModule,
      providers: [OtpService]
    };
  }
 }

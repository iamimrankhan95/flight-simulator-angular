import { NgModule } from '@angular/core';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
  ],
  imports: [
    SharedModule,
    ModalModule,
  ],
  exports: [ConfirmationDialogComponent],
  providers: [ConfirmationDialogService],
  entryComponents: [ConfirmationDialogComponent],

})
export class NotificationModule { }

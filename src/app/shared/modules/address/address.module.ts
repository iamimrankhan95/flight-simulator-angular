import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressFormComponent } from './address-form/address-form.component';
import { SharedModule } from '../../../shared/modules/shared/shared.module';



@NgModule({
  declarations: [AddressFormComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[AddressFormComponent]
})
export class AddressModule { }

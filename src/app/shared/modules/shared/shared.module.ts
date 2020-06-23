import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataFilterPipe } from './pipes/datafilterpipe';
import { ReplaceNullWithText } from './pipes/replace-null-with-text.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    DataFilterPipe,
    ReplaceNullWithText,
    // LoaderComponent,
    // NotPermittedComponent,
    // ShowOnPermissionDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DataFilterPipe,
    ReplaceNullWithText
    // LoaderComponent,
    // NotPermittedComponent,
    // ShowOnPermissionDirective
  ]
})
export class SharedModule { }

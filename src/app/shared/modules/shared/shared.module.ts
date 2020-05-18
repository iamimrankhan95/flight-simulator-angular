import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataFilterPipe } from '../../pipes/datafilterpipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../../components/loader/loader.component';
import { P404Component } from '../../../modules/error/404.component';
import { NotPermittedComponent } from '../../../modules/error/not-permitted.component';
import { P500Component } from '../../../modules/error/500.component';
import { ReplaceNullWithText } from '../../pipes/replace-null-with-text.pipe';
import { ShowOnPermissionDirective } from './show-on-permission.directive';


@NgModule({
  declarations: [
    DataFilterPipe,
    ReplaceNullWithText,
    LoaderComponent,
    P404Component,
    P500Component,
    NotPermittedComponent,
    ShowOnPermissionDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataFilterPipe,
    ReplaceNullWithText,
    LoaderComponent,
    P404Component,
    P500Component,
    NotPermittedComponent,
    ShowOnPermissionDirective
  ]
})
export class SharedModule { }

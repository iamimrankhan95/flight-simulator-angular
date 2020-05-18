import { Injectable } from '@angular/core';
import { ToasterService, Toast } from 'angular2-toaster/angular2-toaster';

@Injectable({
  providedIn: 'root'
})
export class ToasterHelperService {

  constructor(private toasterService: ToasterService) { }

  showSuccess(title: string, message: string) {
    this.toasterService.pop('success', title, message);
  }

  showSuccess_Created(title: string, message: string) {
    this.toasterService.pop('success', title, message);
  }

  showSuccess_Updated(title: string, message: string) {
    this.toasterService.pop('success', title, message);
  }

  showSuccess_Deleted(title: string, message: string) {
    this.toasterService.pop('success', title, message);
  }

  showError(title: string, message: string) {
    this.toasterService.pop('error', title, message);
  }

  showWarning(title: string, message: string) {
    this.toasterService.pop('warning', title, message);
  }

  showInfo(title: string, message: string) {
    this.toasterService.pop('info', title, message);
  }

  showPrimary(title: string, message: string) {
    this.toasterService.pop('primary', title, message);
  }

  showCustomizedToast(toast: Toast) {
    this.toasterService.pop(toast);
  }
}

import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
@Injectable()
export class OtpService {

  otpModalSubject = new Subject<any>();
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  openOtpModal() {
    console.log('asdf')
    this.otpModalSubject.next();
  }
}

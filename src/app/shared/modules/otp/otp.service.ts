import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject, Observable } from 'rxjs';
@Injectable()
export class OtpService {

  otpModalSubject = new Subject<any>();
  otpVerificationSubject = new Subject<boolean>();
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  openOtpModal() {
    // console.log('asdf');
    this.otpModalSubject.next();
  }

  onOpenOtpModal(): Observable<any> {
    return this.otpModalSubject.asObservable();
  }

  verifyOtp(isVerified: boolean) {
    console.log('asdf');
    return this.otpVerificationSubject.next(isVerified);
  }

  onOtpVerification(): Observable<any> {
    return this.otpVerificationSubject.asObservable();
  }
}

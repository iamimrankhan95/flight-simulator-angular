import { Component, OnInit, Input, ViewChild, TemplateRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { OtpService } from './otp.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TranslationHelperService } from '../../services/translation-helper.service';

@Component({
  selector: 'app-otp-modal',
  templateUrl: './otp-modal.component.html',
  styleUrls: ['./otp-modal.component.css'],
})
export class OtpModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() contactNo: number;

  public simpleForm: FormGroup;
  public submitted = false;
  timeLeft: number = 120;
  interval;
  message: boolean;
  otpModalSubscription: Subscription;
  @ViewChild('otpModal') public otpModal: ModalDirective;
  constructor(private formbuilder: FormBuilder,
    private otpService: OtpService) {
    this.otpModalSubscription = this.otpService.onOpenOtpModal().subscribe(() => {
      this.timeLeft = 120;
      this.startTimer()
      this.otpModal.show();
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit() {
    // this.otpService.otpModalSubject.subscribe(() => {
    //   console.log('asdf2')
    //   this.otpModal.show();
    // });
  }

  createForm() {
    this.simpleForm = this.formbuilder.group({
      OTP_code: ['', Validators.required],
    });
    // this.otpTemplate.open();
  }

  get f() {
    return this.simpleForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.simpleForm.valid) {
      // console.log(this.simpleForm.get('OTP_code').value);
      this.otpService.verifyOtp(true);
      this.otpModal.hide();
      // this.userDataService.changeMessage(true);
      // this.modalService.dismissAll();
    }
  }

  onReset() {
    this.submitted = false;
    this.simpleForm.reset();
  }

  resendOTP() {
    console.log('resend OTP request made!');
    this.timeLeft = 120;
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        console.log('Timer ran out! please try again');
        this.onReset();
        return;
      }
    }, 1000);
  }

  closeOtpModal() {
    this.otpModal.hide();
    this.otpService.verifyOtp(false);
    // this.otpSubscription.unsubscribe();
  }

  ngOnDestroy() {
    console.log('destroy')
    // unsubscribe to ensure no memory leaks
    this.otpModalSubscription.unsubscribe();
  }
}

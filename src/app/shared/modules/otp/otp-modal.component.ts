import { Component, OnInit, Input, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { OtpService } from './otp.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-otp-modal',
  templateUrl: './otp-modal.component.html',
  styleUrls: ['./otp-modal.component.css'],
})
export class OtpModalComponent implements OnInit, AfterViewInit {
  @Input() contactNo: number;

  public simpleForm: FormGroup;
  public submitted = false;
  timeLeft: number = 120;
  interval;
  message: boolean;
  subscription: Subscription;
  @ViewChild('otpModal') public otpModal: ModalDirective;
  constructor(private formbuilder: FormBuilder,
    private otpService: OtpService) { }

  ngOnInit(): void {
    this.otpService.otpModalSubject.subscribe(() => {
      this.otpModal.show();
    });
    this.startTimer();
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
      console.log(this.simpleForm.get('OTP_code').value);
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
}

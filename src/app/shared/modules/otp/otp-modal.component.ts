import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp-modal',
  templateUrl: './otp-modal.component.html',
  styleUrls: ['./otp-modal.component.css'],
})
export class OtpModalComponent implements OnInit {
  @Input() contactNo: number;

  public simpleForm: FormGroup;
  public submitted = false;
  timeLeft: number = 120;
  interval;
  message: boolean;


  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.startTimer();
    this.createForm();
  }

  createForm() {
    this.simpleForm = this.formbuilder.group({
      OTP_code: ['', Validators.required],
    });
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

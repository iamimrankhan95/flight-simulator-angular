import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { formatDate } from '@angular/common';
import { OtpService } from '../../../shared/modules/otp/otp.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: [
    './create-user.component.css',
    '../../../../../node_modules/ngx-bootstrap/datepicker/bs-datepicker.scss',
    '../../../../scss/vendors/ng-select/ng-select.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CreateUserComponent implements OnInit, OnDestroy {
  public simpleForm: FormGroup;
  public submitted = false;
  public message: boolean = false;
  public fieldTextType: boolean;
  public submissionError = true;
  public phoneMask = [
    /[0]/,
    /[1-2]/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  public phoneNumber = /^[0-9]\d{10}$/;
  public emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  public maxDate: Date = new Date();
  public userContactNo: number;
  otpVerificationSubscription: Subscription;
  constructor(
    private formbuilder: FormBuilder,
    private userDataService: UserDataService,
    private otpService: OtpService
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 0);
  }
  ngOnDestroy(): void {
    // this.otpVerificationSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.simpleForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      contactNo: [
        '',
        [Validators.required, Validators.pattern(this.phoneNumber)],
      ],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      joiningdate: [this.maxDate, [Validators.required]],
      isActive: [''],
    });
  }

  onSubmit() {
    if (!this.submitted) {
      this.f.joiningdate.setValue(
        formatDate(
          this.simpleForm.get('joiningdate').value,
          'dd/MM/yyyy',
          'en-UK'
        )
      );
    }
    this.submitted = true;
    if (this.simpleForm.valid) {
      this.otpService.openOtpModal();
      this.otpVerificationSubscription = this.otpService
        .onOtpVerification()
        .subscribe((isVerified) => {
          if (isVerified) {
            console.log('verified');
            this.userDataService.register(this.simpleForm.value).subscribe(
              (response) => {
                console.log(response);
                this.onReset();
              },
              (error) => {
                console.log(error);
                this.submitted = false;
              }
            );
          } else {
            console.log('not verified');
          }
          this.otpVerificationSubscription.unsubscribe();
        });
    }
    console.log('modal not touched');
  }

  get f() {
    return this.simpleForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.simpleForm.reset();
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: [
    './create-user.component.css',
    '../../../../../node_modules/ngx-bootstrap/datepicker/bs-datepicker.scss',
    '../../../../scss/vendors/ng-select/ng-select.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class CreateUserComponent implements OnInit {
  public simpleForm: FormGroup;
  public submitted = false;
  public fieldTextType: boolean;
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

  constructor(
    private formbuilder: FormBuilder,
    private userDataService: UserDataService
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 0);
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
      joiningdate: [new Date(), [Validators.required]],
      isActive: [''],
    });
  }
  onSubmit() {
    this.submitted = true;
    this.f.joiningdate.setValue(
      formatDate(
        this.simpleForm.get('joiningdate').value,
        'dd/MM/yyyy',
        'en-UK'
      )
    );
    console.log(this.simpleForm.value);
    if (this.simpleForm.valid) {
      this.userDataService.register(this.simpleForm.value).subscribe(
        (response) => {
          console.log(response);
          this.onReset();
        },
        (error) => {
          console.log(error);
          this.onReset();
        }
      );
    }
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
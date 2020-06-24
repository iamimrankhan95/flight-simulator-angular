import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/user';
import { UserDataService } from '../user-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { DateFormatter } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css',
  '../../../../../node_modules/ngx-bootstrap/datepicker/bs-datepicker.scss',
  '../../../../scss/vendors/ng-select/ng-select.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateUserComponent implements OnInit {

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
  public updateUserId: number;
  public user: User;
  public maxDate: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    private userDataService: UserDataService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 0);
  }

  ngOnInit(): void {
    this.createForm();
    this.updateUserId = +this.route.snapshot.paramMap.get('id');
    this.getUserInfo();
  }

  getUserInfo() {
    this.userDataService.getUser(this.updateUserId).subscribe(
      (response) => {
        console.log(response);
        this.user = response;
        this.setFormValues(this.user);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createForm() {
    this.simpleForm = this.formbuilder.group({
      name: ['', Validators.required],
      contactNo: [
        '',
        [Validators.required, Validators.pattern(this.phoneNumber)],
      ],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      joiningDate: [new Date(), [Validators.required]],
      isActive: [''],
    });
  }

  setFormValues(info: User) {
    this.f.name.setValue(info.name);
    this.f.contactNo.setValue(info.contactNo);
    this.f.email.setValue(info.email);
    this.f.joiningDate.setValue(info.joiningDate);
    this.f.username.setValue(info.username);
    this.f.password.setValue(info.password);
    this.f.isActive.setValue(info.isActive);
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

  onSubmit() {
    this.submitted = true;
    if (!this.f.joiningDate.pristine) {
      this.f.joiningDate.setValue(
        formatDate(
          this.simpleForm.get('joiningDate').value,
          'dd/MM/yyyy',
          'en-UK'
        )
      );
    }
    if (this.simpleForm.valid) {
      this.userDataService
        .updateUser(this.simpleForm.value)
        .subscribe(
          (response) => {
            this.toastr.success('User Information Updated', 'Successful');
            this.router.navigate(['/users/users']);
          },
          (error) => {
            this.toastr.error('User Information Update failed', 'Error');
            this.onReset();
          }
        );
    }
  }
}
